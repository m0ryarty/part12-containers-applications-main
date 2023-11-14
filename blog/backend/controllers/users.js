const bcryptjs = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')


usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 })
  response.json(users)
})
usersRouter.get('/user/:id', async (request, response) => {
  console.log(request.params.id)
  const users = await User.findById(request.params.id).populate('blogs', { url: 1, title: 1, author: 1 })
  response.json(users)
})


usersRouter.post('/', async (request, response, next) => {
    
    const { username, name, password } = request.body
    
        if (username && (password.length > 2)) {
            const saltRounds = 10
            const passwordHash = await bcryptjs.hash(password, saltRounds)
    
            console.log(passwordHash, password)

            const user = new User({
                username,
                name,
                passwordHash,
            })

            const savedUser = await user.save()

            response.status(201).json(savedUser)
        } else {
            response.status(400).json({ error: 'Username or Password are invalid!' })
    
    }
  
})

module.exports = usersRouter