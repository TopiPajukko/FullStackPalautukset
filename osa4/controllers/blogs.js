const blogRouter = require('express').Router()
const Blog = require ('../models/blog')

blogRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })
  
  blogRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)
  
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
  })
  
//   const PORT = 3003
//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`)
//   })

module.exports = blogRouter