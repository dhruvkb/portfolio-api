var axios = require('axios')

module.exports = (req, res) => {
  const { slug } = req.query

  const base = 'https://write.as/api'
  const path = 'collections/dhruvkb/posts'
  const params = {
    body: 'html'
  }

  // Bypass CORS issues
  res.setHeader('Access-Control-Allow-Origin', '*')

  axios
    .get(
      `${base}/${path}`,
      {
        params
      }
    )
    .then(response => {
      const { posts } = response.data.data

      let [ post ] = posts.filter(post => post.slug === slug)
      let data = {
        post
      }

      res
        .status(200)
        .json(data)
    })
    .catch(() => {
      res
        .status(500)
        .end()
    })
}
