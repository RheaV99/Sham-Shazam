const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = async (req, res, next) => {

    // check that user is logged in
    const { authorisation } = req.headers

    if (!authorisation) {
        return res.status(401).json({error: "Authorisation required"})
    }

    const token = authorisation.split(' ')[1]

    try {
        const {id} = jwt.verify(token, process.env.SECRET)

        req.user = await User.findOne({ id }).select('id')
        next()

    } catch (error) {
        console.log(error)
        res.status(401).json({error: "Request not authorised"})
    }
}

module.exports = requireAuth