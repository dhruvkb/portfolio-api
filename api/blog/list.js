const axios = require('axios')
const markdownIt = require('markdown-it')('commonmark')

const constants = require('../constants')

const logic = (offset, count, res) => {
  const path = 'collections/dhruvkb/posts'

  axios
    .get(`${constants.writeAs.apiBase}/${path}`)
    .then(response => {
      const total_count = response.data.data.total_posts
      let posts = response.data.data.posts

      posts = posts
        .slice(offset, offset + count)
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

      res.status(200).json({ total_count, posts })
    })
    .catch(() => {
      res.status(500).json({ message: 'Axios error' })
    })
}

module.exports = (req, res) => {
  let { offset = '0', count = '5' } = req.query
  offset = parseInt(offset)
  count = parseInt(count)

  // Bypass CORS issues
  res.setHeader('Access-Control-Allow-Origin', '*')

  logic(offset, count, res)
}
