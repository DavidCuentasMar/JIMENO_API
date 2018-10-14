const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Hotel = require('../models/hotel');
const https = require('https');


var XLSX = require('xlsx')

router.get('/SetupDB', (req, res, next) => {
	var hotel_to_setup = new Hotel(); 
	hotel_to_setup.collection.remove();

	var workbook = XLSX.readFile('Hotel_Tourism.xls');
	var sheet_name_list = workbook.SheetNames;
	//xlData has all hotels in JSON format
	var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
	// Taking HotelSchema
	hotel_to_setup.collection.insertMany(xlData);
	res.json({ message: 'Setup done' });   

});

router.get('/', (req, res, next) => {
	Hotel.find().then(docs=>{
		console.log(docs);
		res.status(200).json(docs);
	})
});

router.post('/findHotel',(req,res,next) =>{
	var jsonString="";
	if (req.body.field==='SIZE'){
		if(req.body.fieldValue==='small'){
			jsonString = '{"SIZE":{ "$gte":"10","$lt":"50"}}';
		}
		if(req.body.fieldValue==='medium'){
			jsonString = '{"SIZE":{ "$gte":"51","$lt":"100"}}';

		}
		if(req.body.fieldValue==='large'){
			jsonString = '{"SIZE":{ "$gte":"100"}}';
		}
	}else{
		
		jsonString = '{"'+req.body.field+'":"'+req.body.fieldValue+'"}';
	}
	Hotel.find(JSON.parse(jsonString)).then(result=>{
		res.status(200).json(result);
	})
});

router.get('/:hotel_name', (req, res, next) => {
	const id = req.params.productId;
	if(id=='special'){
		res.status(200).json({
			message: 'GET HOTELS',
			id : id
		});	
	}else{
		res.status(200).json({
			message: 'some ID'
		});
	}	
});

//Delete a hotel by id
router.delete('/delete/:hotelId',(req, res, next) => {
    
    Hotel.findByIdAndRemove(req.params.hotelId)
    .then(hotel => {
        if(!hotel) {
            return res.status(404).send({
                message: "Hotel not found with id " + req.params.hotelId
            });
        }
        res.send({message: "Hotel deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Hotel not found with id " + req.params.hotelId
            });                
        }
        return res.status(500).send({
            message: "Could not delete Hotel with id " + req.params.hotelId
        });
    });
});

//Update a hotel by Id	
router.put('/update/:hotelId',(req, res, next) => {
    
    //Aqui voy a validar la API key 
    if(!req.params.hotelId) {
        return res.status(401).send({
            message: "hotel id can not be empty"
        });
    }

// Find hotel and update it with the request body
    Hotel.findByIdAndUpdate(req.params.hotelId, {
        TYPE: req.body.type, 
        SIZE: req.body.rooms, 
        PHONE:req.body.phone, 
        WEBSITE: req.body.website, 
        EMAIL_ID: req.body.email_id
    }, {new: true})
    .then(hotel => {
        if(!hotel) {
            return res.status(404).send({
                message: "hotel not found with id " + req.params.hotelId
            });
        }
        res.send(hotel);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Hotel not found with id " + req.params.hotelId
            });                
        }
        return res.status(500).send({
            message: "Error updating hotel with id " + req.params.hotelId
        });
    });
});




module.exports = router;