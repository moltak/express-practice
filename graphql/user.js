const { makeExecutableSchema } = require("graphql-tools")
const { User } = require('../models')

const typeDefs = `
    type User {
        id: Int,
        name: String
    }

    type Query {
        user(id: Int!): User
    }

    type Mutation {
        createUser(name: String!): User
    }
`

const resolvers = {
    Query: {
        user(_, { id }) {
            return User.findOne({where: {id: id}})
        }
    },
    Mutation: {
        async createUser(_, { name }) {
            await User.build({
                name: name,
                createdAt: new Date(),
                updatedAt: new Date()
            }).save()

            return User.findOne({where: {name: name}})
        }
    }
}

module.exports = makeExecutableSchema({
    typeDefs,
    resolvers
})