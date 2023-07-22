const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

router.post('/foodData' , (req,res)=>{

try{
    
    // here on call we are passing the food items and food Category in the form of array since it was globally defined so it can directly be send
       return res.send([global.food_items , global.foodCategory]);
}
catch(err){
    console.error(err.message);
    res.send("Can't fetch data error");
}

});



module.exports = router;