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
      const {
        firstName,
        lastName,
        email,
        password,
        isAdmin,
        cv,
        github,
        facebook,
        twitter,
        linkedin,
        picture,
      } = args
      const passwordHashed = await hash(password, 10)
      return prisma.user.create({
        data: {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: passwordHashed,
          isAdmin: isAdmin,
          cv: cv,
          github: github,
          facebook: facebook,
          twitter: twitter,
          linkedin: linkedin,
          picture: picture,
        },
      })
    },
    addProject: async (parent, args) => {
      const { image, link, userId } = args
      return await prisma.project.create({
        data: {
          image: image,
          link: link,
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
