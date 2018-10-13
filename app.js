const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const hotelRoutes = require('./api/routes/hotels');
const reservationRoutes = require('./api/routes/reservations');
const userRoutes = require('./api/routes/users');

//mongoose.connect('mongodb://dacuentas:'+process.env.MLABPASS+'@ds025419.mlab.com:25419/databasejs',{ useNewUrlParser: true });

//mongoose.connect('mongodb://USER:PASS@ds025419.mlab.com:25419/databasejs',{ useNewUrlParser: true });
mongoose.connect('mongodb://will:will123@ds249249.mlab.com:49249/databasejs',{useNewUrlParser: true})


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
		return res.status(200).json({});
	}
	next();

});
app.use('/hotels', hotelRoutes);
app.use('/reservations', reservationRoutes);
app.use('/users', userRoutes);

app.use((req,res,next)=>{
	const error = new Error('NOT FOUND');
	error.status=404;
	next(error);
});

app.use((error, req, res, next) =>{
	res.status(error.status || 500);
	res.json({
		error:{
			message: error.message
		}
	});
});

module.exports = app;