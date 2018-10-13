const mongoose = require('mongoose')

const ReservationSchema = mongoose.Schema({   
 	init_date: String,
 	end_date: String,
 	hotel_name: String,
});

module.exports = mongoose.model('Reservaton', ReservationSchema);