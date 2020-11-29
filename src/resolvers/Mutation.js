// import bcrypt from 'bcryptjs'
// import getUserId from '../utils/getUserId'
// import getSignedToken from '../utils/getSignedToken'
// import hashPassword from '../utils/password'

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { User } = require('./../../models/user')

const Mutation = {
    async createUser(parent, args, { prisma }, info) {

        const { username, password, name } = args.data;
        const user = new User({ username, password, name });

        const savedUser = await user.save()

         return {
             user: savedUser,
             token: jwt.sign({ userId: savedUser.id }, 'secret', { expiresIn: '7 days'})
         }
    },
    async login(parent, args, { prisma }, info) {
        const user = await User.findOne({
            username: args.data.username
        })

        if (!user) {
            throw new Error('No such user found')
        }

        const isMatch = await bcrypt.compare(args.data.password, user.password)

        if (!isMatch) {
            throw new Error('Incorrect Password')
        }

        return {
            user,
            token: jwt.sign({ userId: user.id }, 'secret', { expiresIn: '7 days'})
        }
    },
    async deleteUser(parent, args, { prisma, request }, info) {
        // const userId = getUserId(request)

        // return prisma.mutation.deleteUser({ 
        //     where: { 
        //         id: userId 
        //     } 
        // }, info)

        const deleteWait = await User.findByIdAndRemove(args.id)

        return 200
    },
    async updateUser(parent, args, { prisma, request }, info) {
        // const userId = getUserId(request)

        const user = await User.findById(args.data.id)

        if (typeof args.data.password === 'string') {
            user.password = args.data.password
        }

        if (typeof args.data.name === 'string') {
            user.name = args.data.name
        }

        return user.save()

        // return prisma.mutation.updateUser({ 
        //     where: {
        //         id: userId,
        //     },
        //     data: args.data
        // }, info)
    }
}

// export { Mutation as default }
module.exports = Mutation