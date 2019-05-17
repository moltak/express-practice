const expect = require('chai').expect
const request = require('supertest')
const app = require('../app')
const { Comment } = require('../models')

describe.only('Comment Controller Test', () => {
    const DUMMY_CONTENTS        = 'DUMMY_CONTENTS'
    const DUMMY_EDITED_CONTENTS = 'DUMMY_EDITED_TITLE'

    beforeEach(async () => {
        await Comment.destroy({
            where: {},
            truncate: true
        })
    })

    describe('CURD', () => {
        it ('CREATE', async () => {
            return request(app)
                .post('/comments/')
                .send({
                    contents: DUMMY_CONTENTS
                })
                .expect(200)
                .then(async () => {
                    const comment = await Comment.findOne({where: {contents: DUMMY_CONTENTS}})
                    expect(comment).is.not.null
                })
        })

        it ('UPDATE', async () => {
            await Comment.build({
                contents: DUMMY_CONTENTS
            }).save()

            const comment = await Comment.findOne({where: {contents: DUMMY_CONTENTS}})

            return request(app)
                .put(`/comments/${comment.id}`)
                .send({
                    contents: DUMMY_EDITED_CONTENTS
                })
                .expect(200)
                .then(async () => {
                    const editedComment = await Comment.findOne({where: {id: comment.id}})
                    expect(editedComment.contents).is.equal(DUMMY_EDITED_CONTENTS)
                })
        })

        it ('READ', async () => {
            await Comment.build({
                contents: DUMMY_CONTENTS
            }).save()

            return request(app)
                .get('/comments')
                .expect(200)
                .then(res => {
                    expect(res.body._data.comments).is.not.empty
                    expect(res.body._data.comments[0].contents).is.equal(DUMMY_CONTENTS)
                })
        })

        it ('DELETE', async () => {
            await Comment.build({
                contents: DUMMY_CONTENTS
            }).save()

            const comment = await Comment.findOne({where: {contents: DUMMY_CONTENTS}})

            return request(app)
                .delete(`/comments/${comment.id}`)
                .expect(200)
                .then(async () => {
                    const comment = await Comment.findAll({})
                    expect(comment.length).is.equal(0)
                })
        })
    })
})