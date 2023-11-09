const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const Blog = require('./models/blog')
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
require('dotenv').config()

const mongoUrl = process.env.NODE_ENV === 'test' 
 ? process.env.TEST_MONGODBURI
 : process.env.MONGODBURI

//const mongoUrl = process.env.MONGODBURI

mongoose.connect(mongoUrl).then(console.log('connected to ') + mongoUrl)

app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)
app.use(middleware.userExtractor)
app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use(middleware.errorHandler)

module.exports = app