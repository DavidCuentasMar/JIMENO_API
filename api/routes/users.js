const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/user');

router.get('/', (req, res, next) => {
	res.status(200).json({
		message: 'users home'
	});
});

router.post('/CreateUser', (req, res, next) => {
	var user_to_create = new User();
	user_to_create.password = req.body.password;
	user_to_create.email = req.body.email;
	user_to_create.name = req.body.name;
	user_to_create.lastname = req.body.lastname;
	user_to_create.address = req.body.address;
	user_to_create.collection.insertOne(user_to_create).then(result=>{
	res.status(200).json({
		userId: user_to_create.id
	});
	})
});


router.post('/UpdateUser', (req, res, next) => {
	x = 0;
	var jsonString='{"';
	for (var key in req.body) {
    	if(x>1){
    		if(x%2==0){
    			item = req.body[key];
    			//console.log(item);
    			jsonString=jsonString+item+'":"'
    		}else{
    			item = req.body[key];
    			jsonString=jsonString+item+'","'
    		}
    		
    	}
    	x++;
	}
	jsonString=jsonString.substring(0,jsonString.length-2)+'}'
	//console.log(jsonString)
	var obj = JSON.parse(jsonString);
	User.findOneAndUpdate(
		{
			'_id':req.body.id,
			'password':req.body.password
		},
		{
			"$set":obj
		}
	).then(result=>{
		if (result==null) {
			res.status(200).json({
				successful : 0
			});
		}else{
			res.status(200).json({
				successful : 1
			});
		}
		
	}).catch(err=>
	res.status(200).json({
			successful: 0
		}));
});



module.exports = router;