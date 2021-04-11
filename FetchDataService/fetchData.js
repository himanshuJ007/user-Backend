const axios = require('axios');
const User = require('../model/user');
const connectDB = require('../db/config');

connectDB();

module.exports = fetchDataService = async ()=>{
    const response= await axios.get('https://gorest.co.in/public-api/users');
    return await response.data.data;
};