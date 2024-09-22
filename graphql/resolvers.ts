import { Context } from "@/app/api/route"
const bcrypt = require('bcryptjs');

export const resolvers = {
  Query: {
    userMiles: async(parent: any, args: any, context: Context) => {
      return await context.prisma.userMileage.findMany({where: { userId: args.id},
        include: {
        user: true
      }});
    },
    userMile: async(parent: any, args: any, context: Context) => {
      return await context.prisma.userMileage.findUnique({where: {date: args.date, userId: args.id},
        include: {
        user: true
      }});
    },
    users: async(parent: any, args: any, context: Context) => {
      return await context.prisma.user.findMany();
    },
    user: async(parent: any, args: any, context: Context) => {
      return await context.prisma.user.findUnique({where: {id: args.id}});
    },
  },
  Mutation: {
    // USER MUTATIONS
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
    // MILEAGE GOAL MUTATIONS
    addmileagegoal: async(parent: any, args: any, context: Context) => {
      const mileagedata = await context.prisma.userMileage.create({ data: 
        { 
          date: args.date,
          miles: args.miles,
          user: {
            connect: { id: args.id }
          }
        },
        include: {
          user: true
        }
      })
      return mileagedata
    },
    deletemileagegoal: async(parent: any, args: any, context: Context) => {
      const mileagedata = await context.prisma.userMileage.delete({where: { userId: args.id, 
        date: args.date
      },
      include: {
        user: true
      }
      })
      return mileagedata
    },
    updatemileagegoal: async(parent: any, args: any, context: Context) => {
      const mileagedata = await context.prisma.userMileage.update({where: { userId: args.id, date: args.date}, 
      include: {
        user: true
      },
      data: { miles: args.miles } 
      })
      return mileagedata
    },
    setgoalcomplete: async(parent: any, args: any, context: Context) => {
     const mileagedata = await context.prisma.userMileage.update({where: { userId: args.id, date: args.date},
      include: {
        user: true
      },
      data: { completed: args.completed },
      })
     return mileagedata
   },
   deleteusermileage: async(parent: any, args: any, context: Context) => {
    const mileagedata = await context.prisma.userMileage.deleteMany({where: { userId: args.id }})
    return mileagedata
  },
  }
};