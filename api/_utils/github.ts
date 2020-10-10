import { graphql as octokit } from '@octokit/graphql'

import { Repository } from './types'

const githubToken: string | undefined = process.env.GITHUB_PERSONAL_ACCESS_TOKEN
if (githubToken === undefined) {
  throw 'GitHub token is undefined!'
}

export const repository: Repository = {
  owner: 'dhruvkb',
  name: 'portfolio-blog',
}

export const client = octokit.defaults({
  headers: {
    Authorization: `Bearer ${githubToken}`
  }
})
