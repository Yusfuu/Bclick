import { gql } from 'apollo-server-express';

// Construct a schema, using GraphQL schema language
export const typeDefs = gql`
  scalar JSON

  enum Role {
    ADMIN
    DELIVERYMAN
    USER
  }

  input DeliverymanInput {
    email: String
    emailVerified: Boolean
    displayName: String
    photoURL: String
    phoneNumber: String
    disabled: Boolean
    password: String
  }

  type Metadata {
    creationTime: String
    lastSignInTime: String
    lastRefreshTime: String
  }

  type Deliveryman {
    uid: ID!
    email: String!
    emailVerified: Boolean!
    displayName: String!
    photoURL: String!
    phoneNumber: String!
    disabled: Boolean!
    metadata: Metadata!
    customClaims: JSON
  }

  type Error {
    code: String
    message: String
  }

  type Query {
    # query deliveryman
    deliveryman(id: ID!): Deliveryman!
    deliverymens: [Deliveryman]!
  }

  type Mutation {
    # Deliveryman
    createDeliveryman(input: DeliverymanInput!): Deliveryman!
    deleteDeliveryman(id: ID!): Boolean!
    updateDeliveryman(id: ID!, input: DeliverymanInput!): Deliveryman!
    updateCustomClaims(id: ID!, customClaims: JSON!): Boolean!
    bulkDeleteDeliverymans(ids: [ID]!): Boolean!
  }
`;
