import bcrypt from "bcrypt"

export function hash(input){
    return bcrypt.hash(input,8)
}



export function compare(input,hash){
    if (!input){
        return false
    }
    return bcrypt.compare(input, hash)
}