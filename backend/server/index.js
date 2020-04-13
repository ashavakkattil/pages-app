const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const pages = require('../routes/pages')

const app = express()

/* middleware  Start*/
app.use(bodyParser.json())
app.use(cors());
/* middleware  End*/

/* Router  Start*/
app.use('/', pages)
/* Router  End*/

/* DB connection  Start*/
mongoose.connect('mongodb://localhost:27017/pagesDB', {
    useNewUrlParser: true
  })
// mongoose.connect('mongodb://localhost:27017/pagesDB')
var db = mongoose.connection;
db.on('error', () => {
    console.log('error in connection')
})
db.once('open', () => {
    console.log('Successfully connected to the database')
})
/* DB connection  End*/

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server started at port ${port}`)
})