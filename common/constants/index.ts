import path from 'path'

const ROOT_PATH = path.join(__dirname, '../../')

const STATIC_PATH = 'http://localhost:8000/static'

const CODES = {
    SUCCESS: 0,
    EXEC_ERROR: -1,
    RESP_ERROR: -1000
}

export {
    CODES,
    ROOT_PATH,
    STATIC_PATH,
}
