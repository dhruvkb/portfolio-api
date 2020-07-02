const constants = require('../constants')

const logic = (res) => {
  res.status(200).json({
    list: constants.api.blogPosts.list(),
    retrieve: constants.api.blogPosts.retrieve()
  })
}

module.exports = (req, res) => {
  // Bypass CORS issues
  res.setHeader('Access-Control-Allow-Origin', '*')

  logic(res)
}
