const axios = require('axios')

const constants = require('../constants')

const logic = (offset, count, res) => {
  const payload = {
    query: `
      query($repoOwner: String!, $repoName: String!, $objExpression: String) {
        repository(owner: $repoOwner, name: $repoName) {
          tree: object(expression: $objExpression) {
            ...on Tree {
              entries {
                name
                file: object {
                  ...on Blob {
                    text
                  }
                }
              }
            }
          }
        }
      }
    `,
    variables: {
      repoOwner: 'dhruvkb',
      repoName: 'portfolio-blog',
      objExpression: `${constants.gitHub.metadataBranch}:metadata`
    }
  }

  axios
    .post(constants.gitHub.apiEndpoint, payload, {
      auth: {
        username: constants.gitHub.username,
        password: constants.gitHub.personalAccessToken
      }
    })
    .then(response => {
      const { entries } = response.data.data.repository.tree

      const totalCount = entries.length - 1 // Hide blog post #0

      const posts = entries
        .sort((a, b) => -a.name.localeCompare(b.name))
        .slice(offset, Math.min(offset + count, totalCount))
        .map(entry => {
          let post = JSON.parse(entry.file.text)
          post.apiUrl = constants.api.blogPosts.retrieve(post.slug)
          post.portfolioUrl = constants.portfolio.post(post.slug)

          return post
        })

      res.status(200).json({
        totalCount,
        posts
      })
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
