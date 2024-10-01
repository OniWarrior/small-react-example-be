const { JWT_SECRET } = require('../secrets/secret.js')
const jwt = require('jsonwebtoken')
const User = require('../users/user-model.js')


// Verifies json web token in user's authorization header
const restricted = (req, res, next) => {
    const token = req.headers.authorization

    if (!token) {
        res.status(401).json("Token required")
    }
    else {
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(401).json('Token invalid')
            }
            else {
                req.decodedToken = decoded
                next()
            }
        })
    }
}


// checks if the email exists when user is signing in.
const checkEmailExists = (req, res, next) => {
    const { email } = req.body

    User.findByEmail(email)
        .then(rows => {
            if (rows.length) {
                req.userData = rows[0]
                next()
            }
            else {
                res.status(401).json("Invalid credentials")
            }
        })
        .catch(err => {
            res.status(500).json(`Server error: ${err.message}`)
        })
}




// checks whether or not there's a missing or undefined email/password when signing in
// or registering.
const checkForMissingEmailPassword = (req, res, next) => {
    const { email, password } = req.body

    if (!email || username === "" ||
        !password || password === "") {
        res.status(400).json("Email and password are required")
    }
    else {
        next()
    }
}

module.exports = {
    checkForMissingEmailPassword,
    checkEmailExists,
    restricted
}