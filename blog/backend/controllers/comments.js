/* const commentsRouter = require('express').Router()
const Blog = require('../models/blogs')
const User = require('../models/user')
const Comment = require('../models/comments')
const { userExtractor } = require('../utils/middleware')



commentsRouter.get('/:id/comments', async (request, response) => {

  

  const blogComments = await Comment.find({'blog': [request.params.id]})

 
  response.json(blogComments)
})
   
    


commentsRouter.post('/:id/comments', userExtractor, async (request, response) => {
  
  const comment = new Comment({
    comment: request.body.comment    
  })  
  
  const user = request.user
  const blog =  await Blog.findById(request.params.id)


    if (!user) {
    return response.status(401).json({ error: 'operation not permitted' })
  }

  comment.user = user._id
  comment.blog = blog._id 
  

  const createdComment = await comment.save()

  
  user.comments = user.comments.concat(createdComment._id)
  blog.comments = blog.comments.concat(createdComment._id)
  
  

    const x = await user.save() 
    const y = await blog.save() 

  response.status(201).json(createdComment)
})



module.exports = commentsRouter */