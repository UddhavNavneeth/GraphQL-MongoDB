// import { GraphQLServer, PubSub } from 'graphql-yoga'
// import { resolvers } from './resolvers/index'
// import prisma from './prisma'

const { GraphQLServer, PubSub } = require('graphql-yoga')
const resolvers = require('./resolvers/index')

const pubsub = new PubSub();

// const typeDefs = `
//   type Query {
//     users(query: String): [User!]!
//   }

//   type Mutation {
//     createUser(data: CreateUserInput!): AuthPayLoad!
//   }

//   type User {
//     id: ID!
//     name: String!
//     username: String
//     password: String!
//   }

//   input CreateUserInput {
//     username: String!
//     password: String!
//     name: String!
//   }

//   type AuthPayLoad {
//     token: String!
//     user: User!
//   }
// `

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    // typeDefs,
    resolvers,
    context(request) {
        return {
            request
        }
    },
})

// export { server as default }
// module.exports = { server };

server.start(({ port: process.env.PORT || 4001 }), () => {
    console.log('The server is up');
})