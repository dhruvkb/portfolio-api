const axios = require('axios')
const markdownIt = require('markdown-it')('commonmark')

const constants = require('../constants')

const logic = (slug, res) => {
  const path = 'collections/dhruvkb/posts'

  axios
    .get(`${constants.writeAs.apiBase}/${path}/${slug}`)
    .then(response => {
      let post = response.data.data

      post = {
        id: post.id,
        slug: post.slug,
        created: post.created,
        title: post.title,
        tags: post.tags,
        writeAsUrl: `${constants.writeAs.blog}/${post.slug}`,
        portfolioUrl: `${constants.portfolio.post}/${post.slug}`,
        body: markdownIt.render(post.body)
      }

      res.status(200).json({ post })
    })
    .catch(() => {
      res.status(500).json({ message: 'Axios error' })
    })
}

module.exports = (req, res) => {
  const { slug } = req.query

  // Bypass CORS issues
  res.setHeader('Access-Control-Allow-Origin', '*')

  if (slug) {
    logic(slug, res)
  } else {
    res.status(400).json({ message: 'Param \'slug\' is required' })
  }
}
