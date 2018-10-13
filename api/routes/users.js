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

/*router.post('/UpdateUser', (req, res, next) => {
	user_to_update = new User();
	field1 = req.body.field1
	valuefield1=req.body.valuefield1
	field2 = req.body.field2
	valuefield2=req.body.valuefield2
	field3 = req.body.field3
	valuefield3=req.body.valuefield3
	field4 = req.body.field4
	valuefield4=req.body.valuefield4
	field5 = req.body.field5
	valuefield5=req.body.valuefield5
	query=field1:valuefield1,field2:valuefield2,field3:valuefield3,field4:valuefield4,field5:valuefield5;

	User.findOneAndUpdate(
		{
			'_id':req.body.id,
			'password':req.body.password
		},
		{
			"$set":{}
		}
	).then(result=>{
		res.status(200).json({
			name : result.name
		});
	}).catch(err=>
	res.status(200).json({
			ERROR: '404'
		}));
});*/



module.exports = router;