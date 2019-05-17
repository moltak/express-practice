const express = require('express')
const router = express.Router()

const { Comment } = require('../models')

router.post('/', async (req, res, next) => {
    try {
        await Comment.build({
            contents: req.body.contents,
            createdAt: new Date(),
            updatedAt: new Date()
        }).save()

        res.status(200).send('ok')
    } catch (e) {
        res.status(400).send('fail')
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const comment = await Comment.findOne({where: {id: req.params.id}})
        
        await comment.update({
            contents: req.body.contents,
            updatedAt: new Date()
        })

        res.status(200).send('ok')
    } catch (e) {
        console.error(e)
        res.status(400).send('fail')
    }
})

router.get('/', async (req, res, next) => {
    try {
        const comments = await Comment.findAll({})

        res.status(200).json({
            _data: {
                comments: comments
            }
        })
    } catch (e) {
        res.status(400).send('fail')
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        await Comment.destroy({where: {id: req.params.id}})

        res.status(200).send('ok')
    } catch (e) {
        console.error(e)
       res.status(400).send('fail')  
    }
})

module.exports = router
