const axios = require('axios')

const constants = require('../constants')
const utils = require('../utils')

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
      repoOwner: constants.gitHub.repoOwner,
      repoName: constants.gitHub.repoName,
      objExpression: `${constants.gitHub.metadataBranch}:metadata`
    }
  }

  axios
    .post(constants.gitHub.apiEndpoint, payload, {
      headers: {
        Authorization: `Bearer ${constants.gitHub.personalAccessToken}`
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

          const publicationDate = {
            absolute: utils.absoluteDate(post.publicationDate),
            relative: utils.relativeDate(post.publicationDate)
          }
          post.publicationDate = publicationDate

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
