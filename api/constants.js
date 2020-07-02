const origin = process.env.ORIGIN || 'https://api.dhruvkb.now.sh'

module.exports = {
  gitHub: {
    apiEndpoint: 'https://api.github.com/graphql',

    username: 'dhruvkb',
    personalAccessToken: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,

    metadataBranch: 'metadata',
    postsBranch: 'master'
  },
  api: {
    blogPosts: {
      list: (offset = 1, count = 5) =>
        `${origin}/api/blog_posts/list?offset=${offset}&count=${count}`,
      retrieve: (slug = 'hello_world') =>
        `${origin}/api/blog_posts/retrieve?slug=${slug}`
    }
  },
  portfolio: {
    post: (slug) => `https://dhruvkb.github.io/#/blog/post/${slug}`
  }
}
