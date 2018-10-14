const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const ApiKey = require('../models/apikey')
const https = require('https')

// Create and Save a new Hotel
router.post('/create', (req, res, next) => {
    console.log('estoy aqui')
    if(!req.body.contact_name && !req.body.company &&
    	!req.body.email){
        return res.status(400).send({
            message: "fields can not be empty"
        })
    }
    // Create a apikey for a specific client 
    const apiKey = new ApiKey({
	    contact_name: req.body.contact_name,
	 	company: req.body.company,
	 	email: req.body.email
    })

    // Save apikey in the database
   	apiKey.save()
    .then(data => {
    	//const userApiKey = data.id
        res.status(200).send({
        	message: 'your new apiKey is: ' 
        })
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the hotel."
        })
    })
})
module.exports = router