//En este ficheros se realizarán las funciones para extraer, editar, crear y borrar usuarios.
import db from "~/db.server";

export function getUser(email:string){
    return db.user.findUnique({
        where:{
            email:email
        }
    });
}
//Función para obtener un usuario a partir de su email.