import db from "~/db.server";

export async function provincesToFavorites(userId:string,provinceId:string){
    
    return db.provinces.update({
        where:{
            id:provinceId
        },
        data:{
            userId: userId
        }
    });
}
//Función que añade una provincia a las favoritas de un usuario.

export function deleteProvinceFromFavorites(userId:string,provinciaId:string){

}
//Función que elimina una provincia a las favoritas de un usuario.