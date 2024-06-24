import { Context } from "@/app/api/route"
const bcrypt = require('bcryptjs');

export const resolvers = {
  Query: {
    usersMiles: async(parent: any, args: any, context: Context) => {
      return await context.prisma.userMileage.findMany();
    },
    users: async(parent: any, args: any, context: Context) => {
      return await context.prisma.user.findMany();
    }
  },
  Mutation: {
    signup: async(parent: any, args: any, context: Context) => {
      const password = await bcrypt.hash(args.password, 10)

      const user = await context.prisma.user.create({ data: { ...args, password } })
      return user
    },
    // login: async(parent: any, args: any, context: Context) => {
    //   const user = await context.prisma.user.findUnique({ where: { email: args.email } })
    //   if (!user) {
    //     throw new Error('No such user found')
    //   }

    //   const valid = await bcrypt.compare(args.password, user.password)
    //   if (!valid) {
    //     throw new Error('Invalid password')
    //   }

    //   return user
    // }
  }
};