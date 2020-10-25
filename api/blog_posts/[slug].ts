import { NowRequest, NowResponse } from '@vercel/node'

import frontMatter from 'gray-matter'
import MarkdownIt from 'markdown-it'

import { repository, client } from '../_utils/github'
import { insertDates, insertUrls } from './_utils/posts'
import { Retrieve, Post as Attributes } from './_utils/types'

const markdownIt = new MarkdownIt({ html: true })

const logic = async (slug: string, res: NowResponse): Promise<void> => {
  const payload: {
    query: string,
    variables: {
      repoOwner: string,
      repoName: string,
      objExpression: string
    }
  } = {
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
      repoOwner: repository.owner,
      repoName: repository.name,
      objExpression: `master:posts/${slug}.md`
    }
  }

  const { repository: { file: { text } } }: Retrieve = await client(payload.query, payload.variables)

  let { data: attributes, content: body } = frontMatter(text)

  insertDates(attributes as Attributes)
  insertUrls(attributes as Attributes)

  body = markdownIt.render(body)

  res.status(200).json({
    attributes,
    body
  })
}

export default async (req: NowRequest, res: NowResponse): Promise<void> => {
  let { slug: slugQuery = 'hello_world' } = req.query
  if (Array.isArray(slugQuery)) {
    slugQuery = slugQuery[0]
  }

  const slug = slugQuery

  await logic(slug, res)
}
