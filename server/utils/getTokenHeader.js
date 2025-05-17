export function getTokenHeader(headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');

        if (parted.length === 2) {
            return parted[1];
        }
        return null;
    }
    return null;
}