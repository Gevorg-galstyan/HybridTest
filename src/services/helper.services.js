export function textEllipsis(str = '', maxlength = 60) {
    if(!maxlength || str.length < maxlength) {return str}
    return str.slice(0, maxlength) + '...'
}
