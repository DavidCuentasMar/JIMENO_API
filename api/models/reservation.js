const mongoose = require('mongoose')

const ReservationSchema = mongoose.Schema({   
 	init_Date: String,
 	end_Date: String,
 	hotel_name: String,
});

module.exports = mongoose.model('Reservation', ReservationSchema);