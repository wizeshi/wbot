export function stringToBoolean(string: string | boolean) {
    if (typeof string == "string") {
        string.toLowerCase()
        if (string == 'true') {
                return true
        } else if (string == 'false') {
            return false
        } else {
            return undefined
        }
    } else {
        return string
    }
}