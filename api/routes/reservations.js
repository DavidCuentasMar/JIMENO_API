const express = require('express');
const router = express.Router();

const Hotel = require('../models/hotel');
const Reservation = require('../models/reservation');


router.get('/',(req,res,next) =>{
	const id = req.params.productId;

	res.status(200).json({
		message: 'Reservations'
	});
});

router.post('/CreateReservation',(req,res,next) =>{

	Hotel.find({HOTEL_NAME:req.body.hotel_name,CURRENT_ROOMS:{$gte:req.body.rooms}}).then(hotelr=>{
		if(hotelr.length!=0){
			var aux = JSON.stringify(hotelr)
			var hobj = JSON.parse(aux);
			console.log()

			var reserve_to_create = new Reservation();
			var x = 0;
			Reservation.find({hotel_name:req.body.hotel_name}
				).then(result=>{
				//console.log(result);
				var i;
				var y = 0;
				var roomsR=0;
				for (i = 0; i < result.length; i++) { 
		    		var x = JSON.stringify(result[i])
		    		var obj = JSON.parse(x);
						//console.log(obj)
		    			//console.log(parseInt(req.body.endDate)<=parseInt(obj.end_Date))
		    			//console.log(parseInt(req.body.initDate)>=parseInt(obj.init_Date))
		    			
		    		if((((parseInt(req.body.initDate)<=parseInt(obj.end_Date)) && (parseInt(req.body.initDate)>=parseInt(obj.init_Date))) || (parseInt(req.body.endDate)<=parseInt(obj.end_Date)) && (parseInt(req.body.endDate)>=parseInt(obj.end_Date)))) {
		    			y=1;
		    		}
				}
				if (y!=0 || (hobj[0].CURRENT_ROOMS-parseInt(req.body.rooms))<0){
					res.status(200).json({
						error: 'no se puede hacer la reseva en los dias especificados'
					})
				}else{
					reserve_to_create.hotel_name=req.body.hotel_name;
					reserve_to_create.init_Date=req.body.initDate;
					reserve_to_create.end_Date=req.body.endDate;
					reserve_to_create.save(reserve_to_create).then(r=>{
						var hotel_to_update = new Hotel();
						var roomsA = parseInt(hobj[0].CURRENT_ROOMS-parseInt(req.body.rooms));
						Hotel.updateOne({'hotel_name':hobj.hotel_name},{CURRENT_ROOMS:roomsA},function(err, res){
							if (err) throw err;
    							console.log("1 document updated");
						});

						res.status(200).json({
							reservationID: reserve_to_create.id
						})
			
						

					}).catch(err=>
						res.status(200).json({
							error: 'no se pudo crear reserva'
						}))
					

				}



			}).catch(err=>
				res.status(200).json({
					error: 'reservas get error'
				}))

		}else{
			throw new Error('hotel does not exist');
		}
			
		}).catch(err=>
			res.status(200).json({
				error: 'find hotel'
			}))



	
});

module.exports = router;