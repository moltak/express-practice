const expect = require('chai').expect
const request = require('supertest')
const app = require('../app')
const { User, Post, Comment } = require('../models')

describe('User Controller Test', () => {
    const DUMMY_USER        = 'DUMMY_USER'
    const DUMMY_TITLE       = 'DUMMY_TITLE'
    const DUMMY_CONTENTS    = 'DUMMY_CONTENTS'
    const DUMMY_COMMENT     = 'DUMMY_COMMENT'

    beforeEach(async () => {
        await User.destroy({
            where: {},
            truncate: true
        })

        await Post.destroy({
            where: {},
            truncate: true
        })

        await Comment.destroy({
            where: {},
            truncate: true
        })
    })

    describe('CURD', () => {
        it ('CREATE', () => {
            return request(app)
                .post('/users')
                .send({
                    name: DUMMY_USER
                })
                .expect(200)
        })

        it ('READ', async () => {
            await User.build({name: DUMMY_USER}).save()
            const user = await User.findOne({where: {name: DUMMY_USER}})

            return request(app)
                .get(`/users/${user.id}`)
                .expect(200)
                .expect(res => {
                    res.body._data.user.name === DUMMY_USER
                })
        })
    })

    describe('working with post', () => {
        it ('writes post', async () => {
            await User.build({name: DUMMY_USER}).save()
            const user = await User.findOne({where: {name: DUMMY_USER}})
            
            return request(app)
                .post(`/users/${user.id}/posts`)
                .send({
                    title: DUMMY_TITLE,
                    contents: DUMMY_CONTENTS
                })
                .expect(200)
                .then(async () => {
                    const newUser = await User.findOne({where: {id: user.id}})
                    return await newUser.getPosts()
                })   
                .then(posts => {
                    expect(posts[0].title).is.equal(DUMMY_TITLE)
                })
        })

        it ('get posts', async () => {
            await User.build({name: DUMMY_USER}).save()
            const user = await User.findOne({where: {name: DUMMY_USER}})

            await Post.build({
                title: DUMMY_TITLE,
                contents: DUMMY_CONTENTS,
                UserId: user.id
            }).save()
    
            return request(app)
                .get(`/users/${user.id}/posts`)
                .expect(200)
                .then(res => {
                    expect(res.body._data.posts).is.not.empty
                    expect(res.body._data.posts[0].title).is.equal(DUMMY_TITLE)
                })
        })
    })

    describe('working with comment', () => {
        it ('writes commnet', async () => {
            await User.build({name: DUMMY_USER}).save()
            const user = await User.findOne({where: {name: DUMMY_USER}})
            
            return request(app)
                .post(`/users/${user.id}/comments`)
                .send({
                    contents: DUMMY_COMMENT
                })
                .expect(200)
                .then(async () => {
                    const newUser = await User.findOne({where: {id: user.id}})
                    return await newUser.getComments()
                })
                .then(comments => {
                    expect(comments[0].contents).is.equal(DUMMY_COMMENT)
                })
        })

        it ('get comments', async () => {
            await User.build({name: DUMMY_USER}).save()
            const user = await User.findOne({where: {name: DUMMY_USER}})

            await Comment.build({
                contents: DUMMY_COMMENT,
                UserId: user.id
            }).save()
    
            return request(app)
                .get(`/users/${user.id}/comments`)
                .expect(200)
                .then(res => {
                    expect(res.body._data.comments).is.not.empty
                    expect(res.body._data.comments[0].contents).is.equal(DUMMY_COMMENT)
                })
        })
    })
})