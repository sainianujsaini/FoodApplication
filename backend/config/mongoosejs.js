const mongoose = require('mongoose');
const mongoURI = ('mongodb+srv://root:mern123@cluster0.op2vvbo.mongodb.net/gofoodmern?retryWrites=true&w=majority'); 
mongoose.connect(mongoURI).then(()=>{console.log('Connected to DB');
mongoose.connection.db.collection("food_items").find({}).toArray()
.then((data)=>{
    mongoose.connection.db.collection("foodCategory").find({}).toArray().then((categoryData)=>{
            global.food_items = data;
            global.foodCategory = categoryData;}).catch((err)=>{console.log(err);})}).catch((err) => console.log(err));}).catch((err) => {console.log("Error connecting DB",err);});