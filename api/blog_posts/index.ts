import { NowRequest, NowResponse } from '@vercel/node'

import { repository, client } from '../_utils/github'
import { Payload } from '../_utils/types'
import { insertDates, insertUrls } from './_utils/posts'
import { Variables, Entry, List, Post } from './_utils/types'

const logic = async (offset: number, count: number, res: NowResponse): Promise<void> => {
  const payload: Payload<Variables> = {
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
      repoOwner: repository.owner,
      repoName: repository.name,
      objExpression: `metadata:metadata`
    }
  }

  const { repository: { tree: { entries } } }: List = await client(payload.query, payload.variables)

  const totalCount = entries.length - 1 // Hide blog post #0
  const posts = (entries)
    .sort((a: Entry, b: Entry): number => -a.name.localeCompare(b.name))
    .slice(offset, Math.min(offset + count, totalCount))
    .map(entry => {
      let post: Post = JSON.parse(entry.file.text)

      insertDates(post)
      insertUrls(post)

      return post
    })

  res.status(200).json({
    totalCount,
    posts
  })
}

export default async (req: NowRequest, res: NowResponse): Promise<void> => {
  let { offsetQuery = '0', countQuery = '5' } = req.query
  if (Array.isArray(offsetQuery)) {
    offsetQuery = offsetQuery[0]
  }
  if (Array.isArray(countQuery)) {
    countQuery = countQuery[0]
  }

  const offsetNum = parseInt(offsetQuery)
  const countNum = parseInt(countQuery)

  await logic(offsetNum, countNum, res)
}
