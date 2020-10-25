/**
 * Represents the GraphQL data returned by the GitHub API as invoked in the
 * list endpoint at `blog_posts/`.
 */
export interface List {
  repository: {
    tree: {
      entries: Entry[]
    }
  }
}

/**
 * Represents the GraphQL data returned by the GitHub API as invoked in the
 * retrieve endpoint at `blog_posts/[slug]`.
 */
export interface Retrieve {
  repository: {
    file: {
      text: string
    }
  }
}

/**
 * Represents an entry in the blog, consisting of a post name and a JSON file
 * containing the metadata of that post.
 */
export interface Entry {
  name: string,
  file: {
    text: string
  }
}

/**
 * Represents the metadata attributes of an entry in the blog.
 */
export interface Post {
  index: number,
  title: string,
  excerpt: string,
  publicationDate: {
    absolute: string,
    relative: string
  } | string,
  slug: string,
  tags: string[],
  urls?: {
    api: string,
    portfolio: string
  }
}
