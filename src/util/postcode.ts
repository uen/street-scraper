const POSTCODE_REGEX = "[a-zA-Z]{1,2}\d{1,2}\s(\d[a-zA-Z]{2})?"

export const findPostcode = (text: string): string[] | null => {
    return text.match(POSTCODE_REGEX)
}