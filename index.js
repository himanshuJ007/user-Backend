const express = require('express');
const bodyParser = require('body-parser');
const User = require('./model/user');
const connectDB = require('./db/config');
const fetchDataService = require('./FetchDataService/fetchData');
const csvwriter = require('csv-writer');

var createCsvWriter = csvwriter.createObjectCsvWriter


const app = express();
connectDB();
app.use(bodyParser.json());

async function insertDataIntoDB(data) {
    const response = await User.insertMany(data);
}

async function jsonToCSV(data) {
    const csvWriter = createCsvWriter({
        path: 'user_data.csv',
        header: [
            { id: '_id', title: 'ID' },
            { id: 'name', title: 'NAME' },
            { id: 'email', title: 'Email' },
            { id: 'gender', title: 'Gender' },
            { id: 'status', title: 'Status' },
        ]
    });
    csvWriter
        .writeRecords(data)
        .then(() => console.log('Data uploaded into csv successfully'));
}

app.get('/', async (req, res) => {
    const data = await fetchDataService();
    insertDataIntoDB(data);
    const tableData = await User.find();
    res.send(data);
})

app.get('/create', async (req, res) => {
    const tableData = await User.find();
    jsonToCSV(tableData);
    res.send("CSV Successfully Created !!");
})

app.get('/users', async (req, res) => {
    const data = await User.find();
    res.send(data);
})

app.post('/user', async (req, res) => {
    const response = await User.create({
        ...req.body,
        created_at: new Date(),
        updated_at: new Date(),
    });
    res.send(response);
})

app.put('/user/:id', async (req, res) => {
    await User.updateOne({ _id: req.params.id }, {
        ...req.body,
        updated_at: new Date(),
    });
    const response = await User.findOne({ _id: req.params.id });
    res.send(response);
});

app.delete('/user/:id', async (req, res) => {
    console.log(req.params.id);
    const response = await User.deleteOne({ _id: String(req.params.id) });
    res.send(response);
})

app.listen(3012, () => {
    console.log("listening at PORT:3012");
})