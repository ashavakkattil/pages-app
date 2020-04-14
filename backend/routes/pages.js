const express = require('express')
const Page = require('../models/page')

const router = express.Router()

router.get('/', (req, res) => {
    Page.find({ published: true }, function (error, pages) {
        if (error) {
            res.status(500).json({
                message: error.message
            })
        }
        else {
            res.json({
                data: pages,
                message: 'Pages fetched successfully'
            })
        }
    })
})

router.get('/:page_url', (req, res) => {
    Page.find({ 'page_url': { '$regex': req.params.page_url, '$options': 'i' }, published: true }, function (error, page) {
        if (error) {
            res.status(500).json({
                message: error.message
            })
        }
        else {
            res.json({
                data: page[0],
                message: 'Page fetched successfully'
            })
        }
    })
})

router.get('/page/:id', (req, res) => {
    Page.findById(req.params.id, function (error, page) {
        if (error) {
            res.status(500).json({
                message: error.message
            })
        }
        else {
            res.json({
                data: page,
                message: 'Page fetched successfully'
            })
        }
    })
})

router.post('/', (req, res) => {
    Page.create(req.body, (error, page) => {
        if (error) {
            res.status(500).json({
                message: error.message
            })
        }
        else {
            res.json({
                message: 'Created page successfully',
                data: page
            })
        }
    })
})

router.put('/:id', (req, res) => {
    Page.findByIdAndUpdate(req.params.id,req.body, (error, page) => {
        if (error) {
            res.status(500).json({
                message: error.message
            })
        }
        else {
            res.json({
                message: 'Updated page successfully',
                data: page
            })
        }
    })
})

router.delete('/:id', (req, res) => {
    Page.findByIdAndDelete(req.params.id, (error, page) => {
        if (error) {
            res.status(500).json({
                message: error.message
            })
        }
        else {
            res.json({
                message: 'Deleted page successfully',
                data: page
            })
        }
    })
})

module.exports = router