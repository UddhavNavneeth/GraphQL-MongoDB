// import getUserId from '../utils/getUserId'
const { User } = require('./../../models/user')

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
    // me(parent, args, { prisma, request }, info) {
    //     const userId = getUserId(request)

    //     return prisma.query.user({
    //         where: {
    //             id: userId
    //         }
    //     }, info)
    // }
}

// export { Query as default }
module.exports = Query