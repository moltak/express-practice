const express = require('express')
const router = express.Router()

const { User, Post, Comment } = require('../models')

router.post('/', async (req, res, next) => {
    try {
        await User.build({name: req.body.name})
        res.status(200).send('ok')
    } catch (e) {
        res.status(400).send('fail')
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const user = await User.findOne({where: {id: req.params.id}})
        res.status(200).json({
            _data: {
                user: {
                    name: user.name,
                    id: user.id,
                    posts: await user.getPosts(),
                    comments: await user.getComments()
                }
            }
        })
    } catch (e) {
        res.status(400).send('fail')
    }
})

router.post('/:id/posts', async (req, res, next) => {
    try {
        await Post.build({
            title: req.body.title,
            contents: req.body.contents,
            UserId: req.params.id
        }).save()

        res.status(200).send('ok')
    } catch (e) {
        res.status(400).send('fail')
    }
})

router.get('/:id/posts', async (req, res, next) => {
    try {
        const user = await User.findOne({where: {id: req.params.id}})
        const posts = await user.getPosts()

        res.status(200).json({
            _data: {
                posts: posts
            }
        })
    } catch (e) {
        res.status(400).send('fail')
    }
})

router.post('/:id/comments', async (req, res, next) => {
    try {
        await Comment.build({
            contents: req.body.contents,
            UserId: req.params.id
        }).save()

        res.status(200).send('ok')
    } catch (e) {
        res.status(400).send('fail')
    }
})

router.get('/:id/comments', async (req, res, next) => {
    try {
        const user = await User.findOne({where: {id: req.params.id}})
        const comments = await user.getComments()

        res.status(200).json({
            _data: {
                comments: comments
            }
        })
    } catch (e) {
        res.status(400).send('fail')
    }
})

module.exports = router
