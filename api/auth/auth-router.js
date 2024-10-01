const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../secrets/secret')
const {
    checkEmailExists, checkForMissingEmailPassword
} = require('../auth/auth-middleware')

const User = require('../users/user-model')




// path for login to existing account
router.post('/login', checkForMissingEmailPassword, checkEmailExists, (req, res, next) => {
    const { email, password } = req.body
    User.findByEmail(email)
        .then(([user]) => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = makeToken(user)

                res.status(200)
                    .cookie('token', token)
                    .json({
                        message: `welcome back ${user.email}`,
                        token
                    })
            }
            else {
                res.status(401).json('Invalid email/password')
            }

        })
        .catch(err => {
            res.status(500).json(`Server error: ${err.message}`)
        })


})

// create token after successful login
const makeToken = (user) => {
    const payload = {
        user_id: user.user_id,
        email: user.email,
        password: user.password
    }

    const option = {
        expiresIn: '1d'
    }

    return jwt.sign(payload, JWT_SECRET, option)

}

module.exports = router