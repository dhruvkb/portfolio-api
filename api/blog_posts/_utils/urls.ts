import { baseUrl } from '../../_utils/urls'

export const postApiUrl = (slug: string = 'hello_world'): string =>
  `${baseUrl}/blog_posts/${slug}`

export const postPortfolioUrl = (slug: string = 'hello_world'): string =>
  `https://dhruvkb.github.io/#/blog/post/${slug}`
