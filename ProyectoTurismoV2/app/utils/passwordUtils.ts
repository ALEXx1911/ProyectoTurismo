import bcrypt from 'bcryptjs';

export async function hashPassword(password:string){
    const saltRounds=10;
    const hash= await bcrypt.hash(password,saltRounds);
    return hash;
}
//Esta función convierte constraseñas normales a "hashes".

export async function comparePasswords(password:string,hashedPassword:string){
    return await bcrypt.compare(password,hashedPassword);
}
//Esta función determina si dos contraseñas son o no iguales.