const { gql } = require('apollo-server')

const typeDefs = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    isAdmin: Boolean!
    cv: String
    github: String
    facebook: String
    twitter: String
    linkedin: String
    picture: String
    projects: [Project]
    diplomas: [Diploma]
  }

  type UserAuth {
    token: String!
    user: User!
  }

  type Project {
    id: ID!
    image: String!
    userId: ID!
  }

  type Diploma {
    id: ID!
    title: String!
    place: String!
    years: String!
    userId: ID!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
    project(id: ID!): Project
    diploma(id: ID!): Diploma
    projectsByUserId(userId: ID!): [Project]
    diplomasByUserId(userId: ID!): [Diploma]
  }

  type Mutation {
    registerUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
      isAdmin: Boolean!
      cv: String
      github: String
      facebook: String
      twitter: String
      linkedin: String
      picture: String
    ): User!
    login(email: String!, password: String!): UserAuth!
    addProject(image: String!, userId: ID!): Project!
    addDiploma(
      title: String!
      place: String!
      years: String!
      userId: ID!
    ): Diploma!
  }
`
module.exports = {
  typeDefs,
}
