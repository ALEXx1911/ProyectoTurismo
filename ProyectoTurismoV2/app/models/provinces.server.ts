import { json } from "@remix-run/node";
import { getUserById } from "./user.server";
import db from "~/db.server";

export async function provinceToFavorites(userId:string,provinceId:string){
  const user=await getUserById(userId);
  if(user==null){
    return json({errors:{user:"El usuario no existe."}});
  }

  return await db.user.update({
    where:{
      id:userId
    },
    data:{
      provinces:{
        connect:{
          id:provinceId
        }
      }
    }
  });
}
//Función para añadir provincias a favoritos.

export async function deleteProvinceFromFavorites(userId:string,provinceId:string){
  const user=await getUserById(userId);
  if(user==null){
    return json({errors:{user:"El usuario no existe."}});
  }

  return await db.user.update({
    where:{
      id:userId
    },
    data:{
      provinces:{
        disconnect:{
          id:provinceId
        }
      }
    }
  });
}
//Función que sirve para eliminar una provincia de "favoritos" de un usuario.

export async function getUserFavoriteProvinces(userId:string){
  const user=await getUserById(userId);
  
 return db.provinces.findMany({
  where:{
    users:{
        some:{id:userId}
    }
  }
 })
}
//Obtiene las provincias favoritas del usuario.

export function getAllProvincies(nskip:number){
  const pageskip= nskip<0 ? 1 : nskip;
  return db.provinces.findMany({
      skip: (pageskip-1)*8,
      take:8,
      orderBy:{
          nameNoAccent:"asc"
      }
  });
}
//funcion de pruebas
export function getAllProvincies2(query: string | null) {
  return db.provinces.findMany({
    where: {
      name: {
        contains: query ?? "",
      },
    },
    take: 8,
    orderBy: {
      createdAt: "desc",
    },
  });
}

export function getTotalPages(){
  return db.provinces.count();
}

export function getProvincies() {
  return db.provinces.findMany({
    take: 8,
    orderBy: {
      name: "asc",
    },
  });
}

export async function getProvinceByName(provinceName: string) {
  return await db.provinces.findUnique({
    where: {
      name: provinceName,
    },
  });
}
//Función que devuelve una provincia según un ID especificado.

export async function getProvinceById(provinceId:string){
  return db.provinces.findUnique({
    where:{
      id:provinceId
    }
  });
}
//Función que obtiene una provincia a partir de un ID especificado.