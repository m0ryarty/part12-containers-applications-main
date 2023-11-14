var _ = require('lodash')

const dummy = (blogs) => {

  if (blogs) {
    return 1
  }
}

const totalLikes = (blogs) => {

  const result = blogs.reduce((acc, curr) =>
    acc + curr, 0
  )

  return result

}

const favoriteBlog = (blogs) => {
  const result = blogs.reduce((acc, curr) => {
    let favorite = acc
    if (curr.likes > acc.likes) {
      favorite = curr
    }
    delete favorite._id
    delete favorite.url
    delete favorite.__v
    return favorite
  }
  )
  return result

}

const mostBlogs = (blogs) => {


  const blogAuthors = blogs.map(item => item.author)


  const mostBlogger = _.reduce(_.countBy(blogAuthors),
    function (result, value, key) {

      if (value > (result.blogs || 0)) {
        result = {
          author: key,
          blogs: value
        }
      }
      return result
    }, {})


  return mostBlogger
}

const mostLikes = (blogs) => {
  const authorsAndLikes = blogs.map(item => {
    return ({ author: item.author, likes: item.likes })
  })

  let a = {
    author: '',
    likes: 0
  }
  const mostLikesBlogger = authorsAndLikes.reduce((acc, curr) => {

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


  return mostLikesBlogger
}



module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}

