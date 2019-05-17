const express = require('express')
const router = express.Router()

const { Post } = require('../models')

router.post('/', async (req, res, next) => {
    try {
        await Post.build({
            title: req.body.title,
            contents: req.body.contents
        }).save()

        res.status(200).send('ok')
    } catch (e) {
        res.status(400).send('fail')
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const post = await Post.findOne({where: {id: req.params.id}})
        
        await post.update({
            title: req.body.title,
            contents: req.body.contents
        })

        res.status(200).send('ok')
    } catch (e) {
        console.error(e)
        res.status(400).send('fail')
    }
})

router.get('/', async (req, res, next) => {
    try {
        const posts = await Post.findAll({})

        res.status(200).json({
            _data: {
                posts: posts
            }
        })
    } catch (e) {
        res.status(400).send('fail')
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        await Post.destroy({where: {id: req.params.id}})

        res.status(200).send('ok')
    } catch (e) {
        console.error(e)
       res.status(400).send('fail')  
    }
})

module.exports = router
