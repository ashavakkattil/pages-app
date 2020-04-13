const express = require('express')
const Page = require('../models/page')

const router = express.Router()

 router.get('/', (req,res) => {
    Page.find({}, function(error,pages){
        if(error){
            res.status(500).json({
                message: error.message
            })
        }
        else{
            res.json({
                data: pages,
                message: 'Pages fetched successfully'
            })
        }
    })
 })

 router.get('/:id', (req,res) => {
     console.log(req.params.id)
    Page.findById(req.params.id, function(error,page){
        if(error){
            res.status(500).json({
                message: error.message
            })
        }
        else{
            res.json({
                data: page,
                message: 'Page fetched successfully'
            })
        }
    })
 })

 router.post('/', (req,res) => {
   Page.create(req.body, (error,page) => {
       if(error){
           res.status(500).json({
               message: error.message
           })
       }
       else{
           res.json({
               message: 'Created page successfully',
               data: page
           })
       }
   })
 })

module.exports = router