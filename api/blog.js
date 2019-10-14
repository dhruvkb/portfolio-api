var axios = require('axios')

module.exports = (req, res) => {
  const { path = 'collections/dhruvkb/posts' } = req.query

  // Bypass CORS issues
  res.setHeader('Access-Control-Allow-Origin', '*')

  const url = `https://write.as/api/${path}`
  axios
    .get(url)
    .then(response => {
      res
        .status(200)
        .json(
          response.data
        )
    })
    .catch(() => {
      res
        .status(500)
        .end()
    })
}
