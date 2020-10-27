import { RequestParameters } from '@octokit/graphql/dist-types/types'

/**
 * Represents a repository object of the format owner/name.
 */
export interface Repository {
  owner: string
  name: string
}

/**
 * Represents a GraphQL request payload containing both the GraphQL query itself
 * and variables that will populate placeholders defined in the query.
 */
export interface Payload<Variables extends RequestParameters> {
  query: string
  variables: Variables
}
