import { absoluteDate, relativeDate } from '../../_utils/time'
import { postApiUrl, postPortfolioUrl } from './urls'
import { Post } from './types'

/**
 * Generate and insert the URLs into the given Post object. The URLs here refer
 * to the URL of the post on the API and that on the portfolio site.
 *
 * @param {Post} post - the Post instance in which to populate the URLs
 */
export const insertUrls = (post: Post): void => {
  post.urls = {
    api: postApiUrl(post.slug),
    portfolio: postPortfolioUrl(post.slug)
  }
}

/**
 * Generate and insert the dates into the given Post object. The dates here
 * refer to the absolute and relative date of publication of the post.
 *
 * @param {Post} post - the Post instance in which to populate the dates
 */
export const insertDates = (post: Post): void => {
  if (typeof post.publicationDate === 'string') {
    post.publicationDate = {
      absolute: absoluteDate(post.publicationDate),
      relative: relativeDate(post.publicationDate)
    }
  }
}
