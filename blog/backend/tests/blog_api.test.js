const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)
const Blog = require('../models/blogs')
const User = require('../models/blogs')

const bearer = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhlbGxhcyIsImlkIjoiNjQ0NDdhYjllOGY2ZmMzNGQyNzY1NjI1IiwiaWF0IjoxNjgyMjk2NTM1fQ.7_P82BET7WKONobFVNwC2R5vkOjiVkWW3OWYPSsd9dI'

beforeEach(async () => {
  await Blog.deleteMany({})  

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
  
})

describe('when there is initially some notes saved', () => {
test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs').set('Authorization', bearer)

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})


test('blogs are returned as json', async () => {
  await api    
    .get('/api/blogs')
    .set('Authorization', bearer)
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs').set('Authorization', bearer)

  const contents = response.body.map(r => r.title)

  expect(contents).toContain(
    'React patterns'
  )
})

 })


describe('addition of a new blog', () => {
  test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Title',
    author: 'Author',
    url: 'http://www.something.edu',
    likes: 12
  }

  await api
    .post('/api/blogs')
    .set('Authorization', bearer)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
      

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const contents = blogsAtEnd.map(n => n.title)
  expect(contents).toContain(
    'Title'
  )
  })
  test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Title',
    author: 'Author',
    url: 'http://www.something.edu',
    likes: 12
  }

  await api
    .post('/api/blogs')
    .set('Authorization', bearer)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
      

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const contents = blogsAtEnd.map(n => n.title)
  expect(contents).toContain(
    'Title'
  )
  })
  test('adding a blog fails if a token is not provided ', async () => {
  const newBlog = {
    title: 'Title',
    author: 'Author',
    url: 'http://www.something.edu',
    likes: 12
  }

  await api
    .post('/api/blogs')
    .set('Authorization', '')
    .send(newBlog)
    .expect(401)
      

  
  })

  test('likes property is missing from the request', async () => {
  const newBlog = {
    title: 'Title',
    author: 'Author',
    url: 'http://www.something.edu',
    
  }  

  await api
    .post('/api/blogs')
    .set('Authorization', bearer)
    .send(newBlog)    
    .then((request) =>
      expect(request.body.likes).toBe(0)
    )
})

test('the title or url properties are missing from the request data', async () => {
  const newBlog = {
    author: 'Author',    
    likes: 10
  }

  await api
    .post('/api/blogs')
    .set('Authorization', bearer)
    .send(newBlog)    
    .expect(400)
})
  
  test('unique identifier property of the blog posts is named id', async () => {
  
  const idAtEnd = (await helper.blogsInDb()).reduce((acc, curr)=>curr.id)
  expect(idAtEnd).toBeDefined()
})
  
})


describe('viewing a specific blog', () => {
  test('succeeds with a valid id', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .set('Authorization', bearer)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(resultBlog.body).toEqual(blogToView)
  })

  test('fails with statuscode 404 if blog does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()

    await api
      .get(`/api/blogs/${validNonexistingId}`)
      .set('Authorization', bearer)
      .expect(404)
  })

  test('fails with statuscode 400 if id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'

    await api
      .get(`/api/blogs/${invalidId}`)
      .set('Authorization', bearer)
      .expect(400)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {

    await Blog.deleteMany({})

    const newBlog = {
    title: "Title",
    author: "Author of this blog",
    url: "http://www.something.edu",
    likes: 10
    
  }  

  await api
    .post('/api/blogs')
    .set('Authorization', bearer)
    .send(newBlog)

    const blogToDelete = await helper.blogsInDb()  
    

    await api
      .delete(`/api/blogs/${blogToDelete[0].id}`)
      .set('Authorization', bearer)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(0)
    
  })
})

describe('creating new users', () => {
  test('users with invalid password are not created and return a suitable status code and error message', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser1 = {
    "username": "moryarty",
    "name": "Wilson de Souza",
    "password": ""
    }
    
    await api
      .post('/api/users')
      .set('Authorization', bearer)
    .send(newUser1)    
      .expect(400)
    .then(response => expect(response.body).toEqual({"error": "Username or Password are invalid!"}))
      
    const usersAtEnd = await helper.usersInDb()

    expect(usersAtEnd).toEqual(usersAtStart)

  })  
  test('users with invalid username are not created and return a suitable status code and error message', async () => {
    const usersAtStart = await helper.usersInDb()
       
    const newUser2 = {
    "username": "",
    "name": "Wilson de Souza",
    "password": "password"
  }
  await api
    .post('/api/users')
    .set('Authorization', bearer)
    .send(newUser2)    
    .expect(400)
    .then(response => expect(response.body).toEqual({"error": "Username or Password are invalid!"}))
    const usersAtEnd = await helper.usersInDb()

    expect(usersAtEnd).toEqual(usersAtStart)

  })  
  
})




afterAll(async () => {
  await mongoose.connection.close()
})