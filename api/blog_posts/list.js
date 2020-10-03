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
      ...constants.gitHub.repoInfo,
      objExpression: `${constants.gitHub.branches.metadata}:metadata`
    }
  }

  constants.gitHub.client(payload.query, payload.variables)
    .then(response => {
      const { entries } = response.repository.tree

      const totalCount = entries.length - 1 // Hide blog post #0

      const posts = entries
        .sort((a, b) => -a.name.localeCompare(b.name))
        .slice(offset, Math.min(offset + count, totalCount))
        .map(entry => {
          let post = JSON.parse(entry.file.text)

          utils.insertUrls(post)
          utils.insertDates(post)

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

  logic(offset, count, res)
}
