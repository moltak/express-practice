const express = require('express')
const router = express.Router()

const { Post } = require('../models')

router.post('/', async (req, res, next) => {
    try {
        await Post.build({
            title: req.body.title,
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
        const post = await Post.findOne({where: {id: req.params.id}})
        
        await post.update({
            title: req.body.title,
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
        res.status(400).send('fail')  
    }
})

router.get('/:id/comments', async (req,res,next) => {
    try {
        const post = await Post.findOne({where: {id: req.params.id}})
        const page = req.query.page
        const pageMax = req.query.pageMax

        const comments = await post.getComments()

        const next = (page * pageMax) + Number(pageMax)
        const sliced = comments.slice(page * pageMax, next)
        
        res.status(200).json({
            _data: {
                page: page,
                comments: sliced
            },
            _links: {
                current: `/posts/${post.id}/comments?page=${page}&pageMax=${pageMax}`,
                next: `/posts/${post.id}/comments?page=${next}&pageMax=${pageMax}`
            }
        })
    } catch (e) {
        console.error(e)
        res.status(400).send('fail')  
    }
})

module.exports = router
