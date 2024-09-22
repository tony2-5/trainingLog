export const typeDefs = `#graphql
  type User {
    id: String!
    name: String
    email: String
    password: String
    createdAt: DateTime!
    updatedAt: DateTime!
    mileageGoals: [UserMileage!]!
  }

  type UserMileage {
    date: String!
    user: User!
    miles: String!
    completed: Boolean!
  }

  type BatchPayload {
   count: Int!
  }

  type Query {
    users: [User]
    user(id: ID!): User
    userMiles(id: ID!): [UserMileage]
    userMile(date: String!, id: ID!): UserMileage
  }

  scalar DateTime

  type Mutation {
    signup(email: String!, password: String!, name: String!): User
    # login(email: String!, password: String!): User
    deleteaccount(id: ID!): User!
    updateuser(id: ID!, name: String): User!
    updatepassword(id: ID!, passwordOld: String, passwordNew: String): User!
    addmileagegoal(date: String!, id: ID!, miles: String!): UserMileage!
    deletemileagegoal(date: String!, id: ID!): UserMileage!
    updatemileagegoal(date: String!, id: ID!, miles: String!): UserMileage!
    setgoalcomplete(date: String!, id: ID!, completed: Boolean!): UserMileage!
    deleteusermileage(id: ID!): BatchPayload!
  }
`;