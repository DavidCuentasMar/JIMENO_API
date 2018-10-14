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
	console.log(req.body.field)
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
		//location implementation
		if(req.body.field === 'location'){
			//req.body.latitude
			//req.body.longitude
			//req.body.range
		}
		jsonString = '{"'+req.body.field+'":"'+req.body.fieldValue+'"}';
	}
	Hotel.find(JSON.parse(jsonString)).then(result=>{
		res.status(200).json(result);
	})
});


router.post('/setLocation',(req,res,next) =>{

	Hotel.find({}).exec().then((docs)=>{
		docs.forEach( (hotel,index)=>{
			//remplaza globalmente el caracter ["] por '' un espacio vacio
			const address1 = hotel.address.replace(/["]+/g, '')
	        let url = "https://geocoder.api.here.com/6.2/geocode.json?app_id=Kpl9fHfMKSTk6nWKAjd2&app_code=SuoEITqjybbSiqMbjHfvVw&searchtext=";
			//remplaza globalmente el caracter	
			https.get(url + address1, (resp) => { 
	            let data = ''
	            resp.on('data', (chunk) => {
	                data += chunk
	            });
	            resp.on('end', () => {
	                try {
	                	hotelToUpdate = new Hotel()
	                	JSON.parse(data).Response.View.length;
	                	const coordinates = JSON.parse(data).Response.View[0].Result[0].Location.NavigationPosition[0];
	           	       	console.log(coordinates)
	           	       	hotelToUpdate.collection.update({address: hotel.address},{ longitud: coordinates.Longitud, latitude: coordinates.Latitude }, (err) => {
	           	       		if(err){
	           	       			
	           	       			console.log(err)
	           	       		}
	           	       	})    
	                } catch(e) {

	                }
	        	})
	        })
		})
	}).catch(err=>
		res.status(200).json({
			successful: 0
	}));

	res.status(200).json({
		message: 'latitude and longitude update'
	}) 
})

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

router.get('/', (req, res, next) => {
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

module.exports = router;