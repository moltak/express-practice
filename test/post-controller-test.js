const expect = require('chai').expect
const request = require('supertest')
const app = require('../app')
const { Post } = require('../models')

describe('Post Controller Test', () => {
    const DUMMY_USER            = 'DUMMY_USER'
    const DUMMY_TITLE           = 'DUMMY_TITLE'
    const DUMMY_CONTENTS        = 'DUMMY_CONTENTS'
    const DUMMY_COMMENT         = 'DUMMY_COMMENT'
    const DUMMY_EDITED_TITLE    = 'DUMMY_EDITED_TITLE'
    const DUMMY_EDITED_CONTENTS = 'DUMMY_EDITED_TITLE'

    beforeEach(async () => {
        await Post.destroy({
            where: {},
            truncate: true
        })
    })

    describe('CURD', () => {
        it ('CREATE', async () => {
            return request(app)
                .post('/posts/')
                .send({
                    title: DUMMY_TITLE,
                    contents: DUMMY_CONTENTS
                })
                .expect(200)
                .then(async () => {
                    const post = await Post.findOne({where: {title: DUMMY_TITLE}})
                    expect(post).is.not.null
                })
        })

        it ('UPDATE', async () => {
            await Post.build({
                title: DUMMY_TITLE,
                contents: DUMMY_CONTENTS
            }).save()

            const post = await Post.findOne({where: {title: DUMMY_TITLE}})

            return request(app)
                .put(`/posts/${post.id}`)
                .send({
                    title: DUMMY_EDITED_TITLE,
                    contents: DUMMY_EDITED_CONTENTS
                })
                .expect(200)
                .then(async () => {
                    const editedPost = await Post.findOne({where: {id: post.id}})
                    expect(editedPost.title).is.equal(DUMMY_EDITED_TITLE)
                })
        })

        it ('READ', async () => {
            await Post.build({
                title: DUMMY_TITLE,
                contents: DUMMY_CONTENTS
            }).save()

            return request(app)
                .get('/posts')
                .expect(200)
                .then(res => {
                    expect(res.body._data.posts).is.not.empty
                    expect(res.body._data.posts[0].title).is.equal(DUMMY_TITLE)
                })
        })

        it ('DELETE', async () => {
            await Post.build({
                title: DUMMY_TITLE,
                contents: DUMMY_CONTENTS
            }).save()

            const post = await Post.findOne({where: {title: DUMMY_TITLE}})

            return request(app)
                .delete(`/posts/${post.id}`)
                .expect(200)
                .then(async () => {
                    const posts = await Post.findAll({})
                    expect(posts.length).is.equal(0)
                })
        })
    })
})