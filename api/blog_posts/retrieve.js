const frontMatter = require('gray-matter')
const markdownIt = require('markdown-it')({ html: true })

const constants = require('../constants')
const utils = require('../utils')

const logic = (slug, res) => {
  const payload = {
    query: `
      query($repoOwner: String!, $repoName: String!, $objExpression: String) {
        repository(owner: $repoOwner, name: $repoName) {
          file: object(expression: $objExpression) {
            ...on Blob {
              text
            }
          }
        }
      }
    `,
    variables: {
      ...constants.gitHub.repoInfo,
      objExpression: `${constants.gitHub.branches.posts}:posts/${slug}.md`
    }
  }

  constants.gitHub.client(payload.query, payload.variables)
    .then(response => {
      const { text } = response.repository.file

      let { data: attributes, content: body } = frontMatter(text)

      utils.insertUrls(attributes)
      utils.insertDates(attributes)

      body = markdownIt.render(body)

      res.status(200).json({
        attributes,
        body
      })
    })
}

module.exports = (req, res) => {
  const { slug = 'hello_world' } = req.query

  // Bypass CORS issues
  res.setHeader('Access-Control-Allow-Origin', '*')

  logic(slug, res)
}
