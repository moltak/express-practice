const expect = require('chai').expect
const { graphql } = require('graphql')
const UserScheme = require('../graphql/user')
const { User, Post, Comment } = require('../models')

describe('User Scheme test', () => {
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

    it('query user on graphql', async () => {
        await User.build({name: DUMMY_USER}).save()
        const user = await User.findOne({where: {name: DUMMY_USER}})

        const query = `
            query {
                user(id: ${user.id}) {
                    name
                }
            }
        `

        const result = await graphql(UserScheme, query)
        expect(result).to.deep.equal({
            data: {
                user: {
                    name: DUMMY_USER
                }
            }
        })
    })

    it('user create', async () => {
        await User.build({name: DUMMY_USER}).save()
        const user = await User.findOne({where: {name: DUMMY_USER}})

        const query = `
            mutation {
                createUser(name: \"${DUMMY_USER}\") {
                    name
                }
            }
        `

        const result = await graphql(UserScheme, query)
        expect(result).to.deep.equal({
            data: {
                createUser: {
                    name: DUMMY_USER
                }
            }
        })
    })
})
