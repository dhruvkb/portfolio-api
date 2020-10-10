/**
 * Change the given string to title case. This just changes the first letter of
 * the string to uppercase, without changing the rest.
 *
 * @param {string} text - the string to convert to title-case
 */
export const titleCase = (text: string): string => {
  const head: string = text[0].toUpperCase()
  const tail: string = text.slice(1)
  return `${head}${tail}`
}
