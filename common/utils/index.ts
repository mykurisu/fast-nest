const randomString = (length: number): string => {
    const defaultChars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let result = '';
    for (let i = length; i > 0; --i) result += defaultChars[Math.floor(Math.random() * defaultChars.length)];
    return result;
}
export {
    randomString
}