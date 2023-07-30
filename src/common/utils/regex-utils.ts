export function containsHTMLTags(input: string): boolean {
    const htmlTagRegex = /<[a-z][\s\S]*>/i
    return htmlTagRegex.test(input)
}
