var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const PORT = process.env.PORT || 5000
const { Client } = require('pg');
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

var batchNames = [];
var selectedBatch;

// var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/users', usersRouter);

app.get('/api/batchNames', async function(req, res)
{
	try
	{
		batchNames = [];

		const result = await client.query('SELECT batch_name from "BatchData" group by batch_name;');

		for (let row of result.rows)
		{
			batchNames.push(row.batch_name);
		}

		res.json(batchNames);
	}
	catch (err)
	{
		console.log('Error');
		console.error(err);
	}
});

app.get('/api/batchData', async function(req, res)
{
	try
	{
		response = [];
		const result = await client.query('SELECT sample_time, temperature FROM "BatchData" WHERE batch_name=$1;', [req.batchName]);

		for (let row of result.rows)
		{
			response.push(row);
		}

		res.json(response);
	}
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});


app.put('/db', async function(req, res)
{
	try
	{
		var batchName = req.body.batch;
		var temp = req.body.temp;

		var dt = new Date();
		var month = dt.getMonth()+1;  
		var day = dt.getDate();  
		var year = dt.getFullYear();  
		var hour = dt.getHours();
		var minute = dt.getMinutes();
		var second = dt.getSeconds();
		var ts = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;

		client.query('INSERT INTO "BatchData" (sample_time, batch_name, temperature) VALUES($1, $2, $3)', [ts, batchName, temp]);

		res.send("ACK");
	}
	catch (err)
	{
		console.log('Error');
		console.error(err);
	}
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


app.listen(PORT, () => console.log(`App listening on port ${ PORT }`))

client.connect();

module.exports = app;
