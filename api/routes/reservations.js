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

router.post('/reserve',(req,res,next) =>{
	var jsonString="";
	if (req.body.field==='MAX_ROOMS'){
		if(req.body.fieldValue==='small'){
			jsonString = '{"MAX_ROOMS":{ "$gte":"10","$lt":"50"}}';
		}
		if(req.body.fieldValue==='medium'){
			jsonString = '{"MAX_ROOMS":{ "$gte":"51","$lt":"100"}}';

		}
		if(req.body.fieldValue==='large'){
			jsonString = '{"MAX_ROOMS":{ "$gte":"100"}}';
		}
	}else{
		jsonString = '{"'+req.body.field+'":"'+req.body.fieldValue+'"}';
	}
	Hotel.find(JSON.parse(jsonString)).then(result=>{
		res.status(200).json(result);
	})
});

module.exports = router;