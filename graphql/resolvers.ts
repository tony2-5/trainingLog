import { Context } from "@/app/api/route"

export const resolvers = {
  Query: {
    usersMiles: async(parent: any, args: any, context: Context) => {
      return await context.prisma.userMileage.findMany();
    },
    users: async(parent: any, args: any, context: Context) => {
      return await context.prisma.user.findMany();
    }
  },
};