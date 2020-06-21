const axios = require('axios')
const markdownIt = require('markdown-it')('commonmark')

const constants = require('../constants')

const logic = (offset, res) => {
  const path = 'collections/dhruvkb/posts'

  axios
    .get(`${constants.writeAs.apiBase}/${path}`)
    .then(response => {
      return response.data.data.posts
    })
    .then(posts => posts
      .slice(offset, offset + 5)
      .map((post, index) => ({
        index: index + offset,
        id: post.id,
        slug: post.slug,
        created: post.created,
        title: post.title,
        tags: post.tags,
        writeAsUrl: `${constants.writeAs.blog}/${post.slug}`,
        portfolioUrl: `${constants.portfolio.post}/${post.slug}`,
        excerpt: markdownIt.render(post.body.substring(
          0,
          post.body.indexOf('<!--more-->') - 1 // -1 to remove the newline
        ))
      }))
    )
    .then(posts => {
      res.status(200).json({ posts })
    })
    .catch(() => {
      res.status(500).json({ message: 'Axios error' })
    })
}

module.exports = (req, res) => {
  let { offset = '0' } = req.query
  offset = parseInt(offset)

  // Bypass CORS issues
  res.setHeader('Access-Control-Allow-Origin', '*')

  logic(offset, res)
}
