const express = require('express');
const { model } = require('mongoose');
const router = express.Router();

router.post('/foodData' , (req,res)=>{

try{
    // console.log(global.food_items);
    
       return res.send([global.food_items , global.foodCategory]);
}
catch(err){
    console.error(err.message);
    res.send("Can't fetch data error");
}

});



module.exports = router;