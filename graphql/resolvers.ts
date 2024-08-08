import { Context } from "@/app/api/route"
const bcrypt = require('bcryptjs');

export const resolvers = {
  Query: {
    usersMiles: async(parent: any, args: any, context: Context) => {
      return await context.prisma.userMileage.findMany();
    },
    users: async(parent: any, args: any, context: Context) => {
      return await context.prisma.user.findMany();
    },
    user: async(parent: any, args: any, context: Context) => {
      return await context.prisma.user.findUnique({where: {id: args.id}});
    },
  },
  Mutation: {
    signup: async(parent: any, args: any, context: Context) => {
      const password = await bcrypt.hash(args.password, 10)

      const user = await context.prisma.user.create({ data: { ...args, password } })
      return user
    },
    deleteaccount: async(parent: any, args: any, context: Context) => {
      const user = await context.prisma.user.delete({ where: { ...args } })
      return user
    },
    updateuser: async(parent: any, args: any, context: Context) => {
      const user = await context.prisma.user.update({where: { id: args.id }, data: { name: args.name } })
      return user
    },
    updatepassword: async(parent: any, args: any, context: Context) => {
      let user = await context.prisma.user.findUnique({where: { id: args.id }})
      if (!user) {
        throw new Error('No such user found')
      }
      const valid = await bcrypt.compare(args.passwordOld, user.password)
      if (!valid) {
        throw new Error('Invalid password')
      }
      const password = await bcrypt.hash(args.passwordNew, 10)
      user = await context.prisma.user.update({where: { id: args.id }, data: { password: password } })
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