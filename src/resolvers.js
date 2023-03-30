const { prisma } = require('./database.js')
const { hash } = require('bcryptjs')

const resolvers = {
  Query: {
    users: () => {
      return prisma.user.findMany({
        include: {
          projects: true,
          diplomas: true,
        },
      })
    },
    user: (parent, args) => {
      const { id } = args
      return prisma.user.findFirst({
        where: { id: Number(id) },
        include: {
          projects: true,
          diplomas: true,
        },
      })
    },
    project: (parent, args) => {
      const { id } = args
      return prisma.project.findFirst({
        where: { id: Number(id) },
      })
    },
    diploma: (parent, args) => {
      const { id } = args
      return prisma.diploma.findFirst({
        where: { id: Number(id) },
      })
    },
    projectsByUserId: (parent, args) => {
      const { userId } = args
      return prisma.project.findMany({
        where: { userId: Number(userId) },
      })
    },
    diplomasByUserId: (parent, args) => {
      const { userId } = args
      return prisma.diploma.findMany({
        where: { userId: Number(userId) },
      })
    },
  },
  Mutation: {
    registerUser: async (parent, args) => {
      const { firstName, lastName, email, password, isAdmin } = args
      const passwordHashed = await hash(password, 10)
      return prisma.user.create({
        data: {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: passwordHashed,
          isAdmin: isAdmin,
        },
      })
    },
    /*login: async (parent, args) => {
      const { email, password } = args

      const user = await prisma.user.findOne({ where: { email } })

      if (!user) {
        throw new Error('Invalid login')
      }

      const validPassword = await hash(password, user.password)

      if (!validPassword) {
        throw new Error('Invalid login')
      }

      //const token = jwt.sign({ userId: user.id }, APP_SECRET)

      return {
        //token,
        user,
      }
    },*/
    addProject: async (parent, args) => {
      const { image, userId } = args
      return await prisma.project.create({
        data: {
          image: image,
          userId: Number(userId),
        },
      })
    },
    addDiploma: async (parent, args) => {
      const { title, place, years, userId } = args
      return await prisma.diploma.create({
        data: {
          title: title,
          place: place,
          years: years,
          userId: Number(userId),
        },
      })
    },
  },
}

module.exports = {
  resolvers,
}
