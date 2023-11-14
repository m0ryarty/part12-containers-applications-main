const listHelper = require('../utils/list_helper')
const axios = require('axios')
var _ = require('lodash')


const request = axios.get('http://localhost:3003/api/blogs/')




describe('dummy', () => {
  test('dummy returns one', () => {
    request.then(response => {
      const blogs = response.data

      const result = listHelper.dummy(blogs)
      expect(result).toBe(1)

    })

  })

})

describe('total likes', () => {

  test('of empty list is zero', () => {
    request.then(response => {


      const blogsArray = response.data

      let blogs = []

      if (blogsArray.length === 0) {
        blogs = blogsArray.map(item => item.likes)
      }

      const result = listHelper.totalLikes(blogs)
      expect(result).toBe(0)

    })
  })

  test('when list has only one blog, equals the likes of that', () => {
    request.then(response => {


      const blogsArray = response.data

      let blogs = [0, 0]

      if (blogsArray.length === 1) {
        blogs = blogsArray.map(item => item.likes)
      }

      const result = listHelper.totalLikes(blogs)
      expect(result).toBe(blogs[0])

    })

  })

  test('of bigger list is calculated right', () => {
    request.then(response => {

      const blogsArray = response.data.map(item => item.likes)

      const total = blogsArray.reduce((acc, curr) =>
        acc + curr, 0
      )


      const result = listHelper.totalLikes(blogsArray)
      expect(result).toBe(total)

    })
  })
})

describe('favorite blog', () => {
  test('is right', () => {
    request.then(response => {

      const blogs = response.data

      const expected = blogs.reduce((acc, curr) => {
        let favorite = acc
        if (curr.likes > acc.likes) {
          favorite = curr
        }
        delete favorite._id
        delete favorite.url
        delete favorite.__v
        return favorite
      })

      const result = listHelper.favoriteBlog(blogs)
      expect(result).toEqual(expected)


    })
  })
})

describe('Blogger with most blogs', () => {
  test('is correct', () => {
    request.then(response => {

      const blogs = response.data

      const blogAuthors = blogs.map(item => item.author)


      const expected = _.reduce(_.countBy(blogAuthors),
        function (result, value, key) {

          if (value > (result.blogs || 0)) {
            result = {
              author: key,
              blogs: value
            }
          }
          return result
        }, {})




      const result = listHelper.mostBlogs(blogs)
      expect(result).toEqual(expected)
    })
  })
})

describe('Blogger with most likes', () => {
  test('is correct', () => {
    request.then(response => {

      const blogs = response.data


      const authorsAndLikes = blogs.map(item => {
        return ({ author: item.author, likes: item.likes })
      })

      let a = {
        author: '',
        likes: 0
      }
      const expected = authorsAndLikes.reduce((acc, curr) => {

        if (acc.author !== curr.author) {

          if (curr.likes > acc.likes) {
            a = { ...curr }

          }
          acc = curr

        } else {
          return acc.likes = acc.likes + curr.likes

        }
        return a
      }, a)

      const result = listHelper.mostLikes(blogs)
      expect(result).toEqual(expected)

    })
  })
})