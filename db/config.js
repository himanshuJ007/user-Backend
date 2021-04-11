const mongoose = require('mongoose');
const URI = 'mongodb://localhost:27017';
const connectDB = async()=>{
    await mongoose.connect(URI,{
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useFindAndModify: true 
        }
    )
}
module.exports = connectDB;