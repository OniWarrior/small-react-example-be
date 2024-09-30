const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')

const { restricted } = require('../api/auth/auth-middleware.js')

const authRouter = require('../api/auth/auth-router.js')
const userRouter = require('../api/users/user-router.js')

const server = express()

server.use(express.json())
server.use(helmet())
server.use(cors())
server.use(cookieParser())

server.use('/api/auth', authRouter)

server.use('/api/users', userRouter, restricted)