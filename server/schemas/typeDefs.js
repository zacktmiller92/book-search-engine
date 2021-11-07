const { gql } = require('apollo-server-express');

const typeDefs = gql`
  
  type User {
    _id: ID!
    username: String
    email: String
    savedBooks: [Book]
    bookCount: Int
    password: String
  }

  type Book {
    bookId: ID!
    authors: [String]
    description: String
    image: String
    link: String
    title: String!
  }

  input BookInput {
    description: String!
    title: String!
    bookId: String!
    image: String
    link: String
    authors: [String]
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
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(input: BookInput!): User
    removeBook(bookId: ID!): User
  }
`;

module.exports = typeDefs;
