import { PrismaClient } from "@prisma/client";
import { hashPassword } from "~/utils/utils";
//import { data } from "@remix-run/react";
const db = new PrismaClient();

function crearUser(){
    const password="ejemplo";
    const passwordHashed=hashPassword(password);
    return db.user.create({
        data:{
            email:"ejemplo@gmail.com",
            name:"Ejemplo",
        }
    });
}

function eliminarUser(){
    return db.user.delete({
        where:{
            email:"ejemplo@gmail.com"
        }
    });
}

async function seed() {
    const user=await crearUser();
}

seed();

//npx prisma db seed