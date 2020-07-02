const axios = require('axios')
const frontMatter = require('front-matter')
const markdownIt = require('markdown-it')('commonmark')

const constants = require('../constants')

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
      repoOwner: 'dhruvkb',
      repoName: 'portfolio-blog',
      objExpression: `${constants.gitHub.postsBranch}:posts/${slug}.md`
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
      const { text } = response.data.data.repository.file

      let { attributes, body } = frontMatter(text)
      attributes.apiUrl = constants.api.blogPosts.retrieve(attributes.slug)
      attributes.portfolioUrl = constants.portfolio.post(attributes.slug)
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
