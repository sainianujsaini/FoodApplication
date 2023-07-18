const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();


const bcrypt = require('bcryptjs');
const webToken = require('jsonwebtoken');
const webTokenSecret = "qwertyuiopasdfghjklzxcvbnm";



const User = require('../models/User');
router.post('/createuser', [body('email').isEmail(), body('name').isLength({ min: 3 }), body('password').isLength({ min: 4 })], async (req, res) => {

console.log(req.body.email);
console.log(req.body.name);
console.log(req.body.password);
console.log(req.body.location);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        return res.status(400).json({ errors: errors.array() })
    }
    const salt = await bcrypt.genSalt(10);
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

        const passwordCompare = await bcrypt.compare(req.body.password, user.password);

        if (!passwordCompare) {
            return res.status(400).json({ errors: "Incorrect Username or Password" });
        }

        const data = {
            user: {
                id: user.id
            }
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