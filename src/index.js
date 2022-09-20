const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const mongoose = require('mongoose');
const multer=require('multer')
const app = express();

app.use(bodyParser.json());
app.use(multer().any())
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://dishapushpad1997:0DproZ5drs9XMYYT@group31database.m3wg7re.mongodb.net/college_interns?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDb is connected......."))
    .catch(err => console.log(err))

app.use('/', route);


app.listen(process.env.PORT || 3001, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3001))
});
