const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

// Defining user schema for database
const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
})

// Method for signing up new user
userSchema.statics.signup = async function(userName, email, password) {
    // Look for existing userName or email in database
    const existsEmail = await this.findOne({ email })
    const existsUserName = await this.findOne({ userName })

    // If existing userName/email, throw an error
    if (existsEmail) {
        throw Error('Email already in use')
    }
    if (existsUserName) {
        throw Error('User name already in use')
    }

    // If user doesn't provide email, name or password, throw error
    if (!email || !password || !userName) {
        throw Error('Please fill in all fields')
    }

    // Hash password using bcrypt module in order to store it securely in database
    const salt = await bcrypt.genSalt(5)
    const hash = await bcrypt.hash(password, salt)

    // Create user object with given name, email and hashed password
    const user = await this.create({ userName, email, password: hash})

    return user
}

// Method for logging in user
userSchema.statics.login = async function(email, password) {
    // If user doesn't provide email or password, throw error
    if (!email || !password) {
        throw Error('Please fill in all fields')
    }

    // Find user with corresponding email
    const user = await this.findOne({ email })

    // Throw error if user not found
    if (!user) {
        throw Error('No account with that email found!')
    }

    // Check if provided password is correct
    const passCheck = await bcrypt.compare(password, user.password)

    // Error if wrong password provided
    if (!passCheck) {
        throw Error('Incorrect password provided')
    }

    return user
}

module.exports = mongoose.model('User', userSchema)