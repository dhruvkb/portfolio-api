var axios = require('axios')

module.exports = (req, res) => {
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
      const { url, posts } = response.data.data

      let data = {
        posts: posts.slice(0, 5).map(post => {
            return {
              id: post.id,
              slug: post.slug,
              url: `${url}${post.slug}`,
              title: post.title,
              excerpt: post.body.substring(0, post.body.indexOf('</p>\n') + 4)
            }
          }
        )
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
