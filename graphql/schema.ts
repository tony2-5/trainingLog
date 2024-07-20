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
    id: ID!
    daysMiles: MileageGoals!
    mileageGoalDay: DateTime!
    user: User!
  }

  type MileageGoals {
    day: DateTime!
    miles: String!
    completed: Boolean!
    incomplete: Boolean
    user: [UserMileage!]!
  }

  type Query {
    users: [User]
    user(id: ID!): User
    usersMiles: [UserMileage]
  }

  scalar DateTime

  type Mutation {
    signup(email: String!, password: String!, name: String!): User
    # login(email: String!, password: String!): User
    deleteaccount(id: ID!): User!
    updateuser(id: ID!, name: String): User!
  }
`;