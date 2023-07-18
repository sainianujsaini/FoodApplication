const express = require('express');
const mongoose = require('mongoose');
// const cors = require('cors');

const app = express();
// app.use(cors());
const port = 5000;
const db = require('./config/mongoosejs');


app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin" , "http://localhost:3000");
    res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.use(express.json());
app.use('/api' , require('./Router/CreatUser'));
app.use('/api' , require('./Router/DisplayData'));

app.listen(port , ()=>{console.log('App is listening on port ',port);});