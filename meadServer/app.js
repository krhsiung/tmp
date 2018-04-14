var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const PORT = process.env.PORT || 5000

// var pgp = require('pg-promise')(/*options*/)
// var db = pgp('postgres://user1:changeme@localhost:5433/MeadTempData10')

var indexRouter = require('./routes/index');
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

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

// app.get('/', (req, res) => document.write("BEES!"));

app.listen(PORT, () => console.log(`Example app listening on port ${ PORT }`))

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

console.log("New take");
try {
	const client = pool.connect()
	const result = client.query('SELECT * FROM "BatchData"');
	console.log("Result from query: " + result);
	// res.render('pages/db', result);
	client.release();
} catch (err) {
	console.log('Error');
	console.error(err);
	// res.send("Error " + err);
}

app.get('/db', async (req, res) => {
	console.log("Getting response");
  try {
    const client = await pool.connect()
    const result = await client.query('SELECT * FROM "BatchData"');
    console.log("Result from query: " + result);
    res.render('pages/db', result);
    client.release();
  } catch (err) {
  	console.log('Error');
    console.error(err);
    res.send("Error " + err);
  }
});

console.log('After the get');

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


// db.none('INSERT INTO BatchData"(sample_time, batch_name, temperature) VALUES($1, $2, $3)', [ts, 'code_test', 24])
//     .then(() => {
//         console.log('success');
//         db.any('SELECT * FROM "BatchData"', [true])
// 		  .then(data => {
// 		    console.log('DATA:', data); // print data;
// 		})
// 		.catch(error => {
// 		    console.log('ERROR:', error); // print the error;
// 		})
//     })
//     .catch(error => {
//         console.log('error: ');
//         console.log(error.message)
//     });

module.exports = app;
