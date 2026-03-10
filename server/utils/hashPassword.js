import bcrypt from 'bcrypt'

export async function createHashPassword(text, rounds=10){
    return await bcrypt.hash(text, rounds)
}

export async function verifyHashPassword(text, hashPassword){
    return await bcrypt.compare(text, hashPassword)
}