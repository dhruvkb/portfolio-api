import { NowRequest, NowResponse } from '@vercel/node'

const logic = (name: string, res: NowResponse): void => {
  res.status(200).json({
    message: `Hello, ${name}!`
  })
}

export default (req: NowRequest, res: NowResponse): void => {
  let { nameQuery = 'World' } = req.query
  if (Array.isArray(nameQuery)) {
    nameQuery = nameQuery.join(' & ')
  }

  const name = nameQuery

  logic(name, res)
}
