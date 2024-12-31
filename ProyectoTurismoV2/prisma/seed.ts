import { PrismaClient } from "@prisma/client";
import { hashPassword } from "~/utils/passwordUtils";
import { createProvinces, connectCategoriesWithProvinces } from "./provincias";

const db = new PrismaClient();

async function crearUser(){
    const password="ejemplo";
    const passwordConHash= await hashPassword(password);

    return db.user.create({
        data:{
            email:"ejemplo@gmail.com",
            name:"Ejemplo",
           password:passwordConHash
        }
    });
}
//Función para crear un usuario de prueba.

function eliminarUser(){
    return db.user.delete({
        where:{
            email:"ejemplo@gmail.com"
        }
    });
}
function createCategory(){
    return db.category.createMany({
        data:[
            {
                name:"costa"
            },
            {
                name:"islas"
            },
            {
                name:"sierra"
            }
        ]
    })
}

async function seed() {
    const user=await crearUser();
    const category= await createCategory();
    const provinces=await createProvinces();
    await connectCategoriesWithProvinces();
}

seed();

//npx prisma db seed