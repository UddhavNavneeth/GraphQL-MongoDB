// import getUserId from '../utils/getUserId'
const { User } = require('./../../models/user')
const getUserId = require('./../utils/getUserId')

const Query = {
    users(parent, args, {  }, info) {
        // const opArgs = {
        //     first: args.first,
        //     skip: args.skip,
        //     after: args.skip,
        //     orderBy: args.orderBy
        // }

        // if (args.query) {
        //     opArgs.where = {
        //         name_contains:  args.query
        //     }
        // }

        // return prisma.query.users(opArgs, info)
        return User.find()
    },
    me(parent, args, { request }, info) {
        const userId = getUserId(request)

        return User.findById(userId)
    }
}

// export { Query as default }
module.exports = Query