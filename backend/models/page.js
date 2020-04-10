const mongoose = require('mongoose')
var Schema = mongoose.Schema

var PageSchema = new Schema({
    page_type: String,
    page_title: String,
    page_description: String,
    page_url: String,
    published: Boolean
})

module.exports = mongoose.model('Page', PageSchema)