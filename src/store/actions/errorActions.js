import { GET_ERRORS, CLEAR_ERRORS } from "./types"


export const returnErrors = (msg, status, id = null) => {
    console.log(`msg is ${msg}`)
    return {
        type: GET_ERRORS,
        payload: {msg, status, id}
    }
}