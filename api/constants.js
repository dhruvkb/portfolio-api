const { graphql: octokit } = require('@octokit/graphql')

const origin = process.env.ORIGIN || 'https://api.dhruvkb.now.sh'
const token = process.env.GITHUB_PERSONAL_ACCESS_TOKEN

const list = (offset = 0, count = 5) =>
  `${origin}/api/blog_posts/list?offset=${offset}&count=${count}`

const retrieve = (slug = 'hello_world') =>
  `${origin}/api/blog_posts/retrieve?slug=${slug}`

const post = slug => `https://dhruvkb.github.io/#/blog/post/${slug}`

module.exports = {
  gitHub: {
    client: octokit.defaults({
      headers: {
        Authorization: `Bearer ${token}`
      }
    }),

    repoInfo: {
      repoOwner: 'dhruvkb',
      repoName: 'portfolio-blog'
    },
    branches: {
      metadata: 'metadata',
      posts: 'master'
    }
  },
  api: {
    blogPosts: {
      list,
      retrieve
    }
  },
  portfolio: {
    post
  }
}
