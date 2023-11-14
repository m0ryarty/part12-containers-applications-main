const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')
const User = require('../models/user')
const { userExtractor } = require('../utils/middleware')
const Comment = require('../models/comments')





blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
       
})

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
       
})

blogsRouter.get('/comments', async (request, response) => {
    const comments = await Comment.find({})
    response.json(comments)
       
} )

blogsRouter.get('/:id', async (request, response) => {

  const blog = await Blog.findById(request.params.id).populate('user', { username: 1, name: 1 })
  if (blog) {
    response.json(blog)
  } else  { 
    response.status(404).end()
  }
})



blogsRouter.post('/', userExtractor, async (request, response) => {
  const { title, author, url, likes, comments } = request.body
  const blog = new Blog({
    title, author, url, 
    likes: likes ? likes : 0,
    comments: comments ? comments : []
  })

  console.log(request.body)

  
  
  const user = request.user

  if (!user) {
    return response.status(401).json({ error: 'operation not permitted' })
  }

  blog.user = user._id

  const createdBlog = await blog.save()

  user.blogs = user.blogs.concat(createdBlog._id)
  const x = await user.save()  

  response.status(201).json(createdBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const user = request.user  

  const blog = await Blog.findById(request.params.id)
  
  if (user.id.toString() === blog.user.toString()) {

    await User.updateOne({_id:user.id}, {$pull:{blogs: request.params.id}})
    
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    response.status(400).send({"error": "User is not allowed to delete this blog"})
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: body.user
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
  response.json(updatedBlog)
  
})



blogsRouter.get('/:id/comments', async (request, response) => {

  

  const blogComments = await Comment.find({'blog': [request.params.id]})

 
  response.json(blogComments)
})
   
    


blogsRouter.post('/:id/comments', userExtractor, async (request, response) => {
  
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

module.exports = blogsRouter