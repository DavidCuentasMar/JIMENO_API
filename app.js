const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const hotelRoutes = require('./api/routes/hotels');
const reservationRoutes = require('./api/routes/reservations');
const userRoutes = require('./api/routes/users');
const apiKeyRoutes = require('./api/routes/apikeys');

//mongoose.connect('mongodb://dacuentas:'+process.env.MLABPASS+'@ds025419.mlab.com:25419/databasejs',{ useNewUrlParser: true });

//mongoose.connect('mongodb://USER:PASS@ds025419.mlab.com:25419/databasejs',{ useNewUrlParser: true });
const dbConfig = 'mongodb://will:will123@ds249249.mlab.com:49249/databasejs'
mongoose.connect(dbConfig, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use((req,res,next) => {
	res.header(
		'Access-Control-Allow-Origin','*',
		'Access-Control-Allow-Headers','*'
	);
	if(req.method ==='OPTIONS'){
		res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,GET,DELETE');
		console.log('estoy aqui3')
		return res.status(200).json({});
	}
	next();

});

app.use('/hotels', hotelRoutes);
app.use('/reservations', reservationRoutes);
app.use('/users', userRoutes);
app.use('/apikey', apiKeyRoutes);

app.use((req,res,next)=>{
	console.log('estoy aqui1')
	const error = new Error('NOT FOUND');
	error.status=404;
	next(error);
});

app.use((error, req, res, next) =>{
	console.log('estoy aqui2')
	res.status(error.status || 500);
	res.json({
		error:{
			message: error.message
		}
	});
});

module.exports = app;