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

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

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
// app.use('/users', usersRouter);

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/db', async function(req, res)
{
	try
	{
		const result = await client.query('SELECT * from "BatchData";');
		for (let row of result.rows)
		{
			res.send(JSON.stringify(row));
		}
	}
	catch (err)
	{
		console.log('Error');
		console.error(err);
	}
});

app.put('/db', function(req, res)
{
	console.log('Servicing put request');
	console.log(req);
	// console.log('request head: ');
	// console.log(req.head);
	// console.log('request body: ');
	// console.log(req.body);
	res.send(req.body);
	try
	{
		// var json = JSON.parse(req.body);
		// var batchName = json.batch;
		// var temp = json.temp;
		// console.log(batchName);
		// res.send(batchName);
		// var batchName = req;
		// var temp = req;

		// var dt = new Date();
		// var month = dt.getMonth()+1;  
		// var day = dt.getDate();  
		// var year = dt.getFullYear();  
		// var hour = dt.getHours();
		// var minute = dt.getMinutes();
		// var second = dt.getSeconds();
		// var ts = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;

		// client.query('INSERT INTO BatchData"(sample_time, batch_name, temperature) VALUES($1, $2, $3)', [ts, batchName, temp])
	}
	catch (err)
	{
		console.log('Error');
		console.error(err);
	}
})

// app.get('/db', async (req, res) => {
// 	console.log("Getting response");
//   try {
//     const result = await client.query('SELECT * FROM "BatchData"');
//     res.send("Result from query: " + result);
//     // res.render('pages/db', result);
//     client.release();
//   } catch (err) {
//   	console.log('Error');
//     console.error(err);
//     res.send("Error " + err);
//   }
// });

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
	
// client.query('SELECT * FROM "BatchData";', (err, res) => {
//   if (err) throw err;
//   for (let row of res.rows) {
//     console.log(JSON.stringify(row));
//   }
//   client.end();
// });


// app.put('/data', function(req, res)
// {
// 	var dt = new Date();
// 	var month = dt.getMonth()+1;  
// 	var day = dt.getDate();  
// 	var year = dt.getFullYear();  
// 	var hour = dt.getHours();
// 	var minute = dt.getMinutes();
// 	var second = dt.getSeconds();
// 	var ts = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;

// 	console.log('Received put request at: ' + ts);
// 	document.write('Received put request at: ' + ts);
// 	alert('Received put request at: ' + ts);
// })

module.exports = app;
