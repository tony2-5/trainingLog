import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from '@apollo/server';
import { PrismaClient } from '@prisma/client';
import prisma from '@/prisma/db';
import { typeDefs } from '@/graphql/schema'
import { resolvers } from '@/graphql/resolvers'

export type Context = {
  prisma: PrismaClient
}

const apolloServer = new ApolloServer<Context>({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler(apolloServer, {
  context: async(req,res) => ({req,res,prisma})
});
export { handler as GET, handler as POST };