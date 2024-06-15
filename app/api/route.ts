import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from '@apollo/server';
import { PrismaClient } from '@prisma/client';
import prisma from '@/prisma/db';

export type Context = {
  prisma: PrismaClient
}

const resolvers = {
  Query: {
    usersMiles: async(parent: any, args: any, context: Context) => {
      return await context.prisma.userMileage.findMany();
    },
    users: async(parent: any, args: any, context: Context) => {
      return await context.prisma.user.findMany();
    }
  },
};

const typeDefs = `#graphql
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
    usersMiles: [UserMileage]
  }

  scalar DateTime
`;

const apolloServer = new ApolloServer<Context>({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler(apolloServer, {
  context: async(req,res) => ({req,res,prisma})
});
export { handler as GET, handler as POST };