const Blog = require('../models/blogs')
const User = require('../models/users')

const initialBlogs = [
  {
    
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    
  },
  {
    
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    
  }
]

const initialUser = {
    "username": "username",
    "name": "name",
    "password": "password"
}

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'will remove this soon',
    author: 'someone',
    url: "https://someplace.com/",
    likes: 1,
  })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs,
  initialUser,
  nonExistingId,
  blogsInDb,
  usersInDb
}