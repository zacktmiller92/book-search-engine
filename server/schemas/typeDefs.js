const { gql } = require('apollo-server-express');

const typeDefs = gql`

  type User {
    _id: ID
    username: String
    email: String
    password: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
  }

  type Mutation {
    loginUser(email: String!, password: String!): User
    createUser(username: String!, email: String!, password: String!): User
  }
`;

module.exports = typeDefs;