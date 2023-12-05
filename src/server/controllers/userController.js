// Get user model
const User = require('../models/userModel')
const jsonwebtoken = require('jsonwebtoken')

// Function for creating JSON web token that is valid for 2 days
const jsonToken = (id) => {
    return jsonwebtoken.sign({id}, process.env.SECRET, { expiresIn: '2d'})
}

// login
const loginUser = async (request, response) => {
    const {email, password} = request.body

    try {
        const user = await User.login(email, password)

        // create JSON token
        const token = jsonToken(user.id)

        // If successful, return 200 response code and the user name with the JSON web token
        response.status(200).json({email, token})
    } catch (error) {
        // If unsuccessful, return 400 response code with error message
        response.status(400).json({error: error.message})
    }
}

// signup
const signupUser = async (request, response) => {
    const {userName, email, password} = request.body

    try {
        const user = await User.signup(userName, email, password)

        // create JSON token
        const token = jsonToken(user.id)

        // If successful, return 200 response code and the user name with the JSON web token
        response.status(200).json({email, token})
    } catch (error) {
        // If unsuccessful, return 400 response code with error message
        response.status(400).json({error: error.message})
    }
}


module.exports = {signupUser, loginUser}