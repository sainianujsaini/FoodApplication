const express = require('express');
// body and validationResult are required to check the incoming body parts are correct and matches with the pass or not
const { body, validationResult } = require('express-validator');
// common for router
const router = express.Router();

// bcrypt is required to convert the pass into hash form
const bcrypt = require('bcryptjs');
// jwt is required to allocate the authToken in local storage
const webToken = require('jsonwebtoken');
// by this string authToken is created
const webTokenSecret = "qwertyuiopasdfghjklzxcvbnm";



const User = require('../models/User');

// here we are using express-validator router.post('request' , [validators] , callback function);
router.post('/createuser', [body('email').isEmail(), body('name').isLength({ min: 3 }), body('password').isLength({ min: 4 })], async (req, res) => {

console.log(req.body.email);
console.log(req.body.name);
console.log(req.body.password);
console.log(req.body.location);

// this is to check whether there are any errors on validation with validators
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        return res.status(400).json({ errors: errors.array() })
    }
    // This function generates a random salt (a long and random string) with a cost factor of 10. The cost factor determines the number of iterations that bcrypt will use when generating the hash. Higher cost factors make the hashing process slower
    const salt = await bcrypt.genSalt(10);
    // this function hashes the password with that long string generated
    let securedPassword = await bcrypt.hash(req.body.password, salt);


    try {
       

        User.findOne({ email: req.body.email }).then(async (user) => {

            if (!user) {
                await User.create({
                    name: req.body.name,
                    password: securedPassword,
                    email: req.body.email,
                    location: req.body.location
                    
                })
                console.log("User saved successfully");
                return res.json({success:true})

            }

            else{return res.json({success:true})}

        })
    }
    catch (err) {
        console.log(err);
        res.json({ success: false });
    }





});


router.post('/loginuser', async (req, res) => {
    try {
        console.log(req.body.email);
        console.log(req.body.password);
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(400).json({ errors: "Incorrect Username or Password" });
        }
        // to compare the password saved with password entered in hashed form
        const passwordCompare = await bcrypt.compare(req.body.password, user.password);

        if (!passwordCompare) {
            return res.status(400).json({ errors: "Incorrect Username or Password" });
        }


        // once on validating we are assigning the authToken to user with salt as its id
        const data = {
            user: {id: user.id}
        }

        // Creating session id with user's id
        // In this, the cookie/authToken is generated in 3 parts i.e., body, payload,...
        // where body is email and password that we send and payload we give here is id
        const authToken = webToken.sign(data, webTokenSecret);

        return res.json({ success: true, authToken });
    } catch (err) {
        console.log("There is an error in finding user", err);
        res.json({ success: false });
    }
});


module.exports = router;