const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')



const authRouter = require('../api/auth/auth-router')


const server = express()

server.use(express.json())
server.use(helmet())
server.use(cors())
server.use(cookieParser())

server.use('/api/auth', authRouter)


module.exports = server