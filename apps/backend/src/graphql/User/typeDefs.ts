import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  input UserInput {
    email: String
    emailVerified: Boolean
    displayName: String
    photoURL: String
    phoneNumber: String
    disabled: Boolean
    password: String
  }

  type Error {
    code: String
    message: String
  }

  type Metadata {
    creationTime: String
    lastSignInTime: String
    lastRefreshTime: String
  }

  type User {
    uid: ID!
    email: String!
    emailVerified: Boolean!
    displayName: String!
    photoURL: String
    phoneNumber: String!
    disabled: Boolean!
    metadata: Metadata!
    customClaims: JSON
  }

  type Query {
    # query for user
    user(id: ID!): User!
    users: [User]!
  }

  type Mutation {
    # User
    createUser(input: UserInput!): User!
    deleteUser(id: ID!): Boolean!
    updateUser(id: ID!, input: UserInput!): User!
    bulkDeleteUsers(ids: [ID]!): Boolean!
  }
`;
