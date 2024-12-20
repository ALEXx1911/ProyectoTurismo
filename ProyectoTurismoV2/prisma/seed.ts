import { PrismaClient } from "@prisma/client";
//import { data } from "@remix-run/react";
const db = new PrismaClient();

function crearUser(){
    return db.user.create({
        data:{
            email:"ejemplo@gmail.com",
            name:"Ejemplo"
        }
    })
}

async function seed() {
    const user=await crearUser();
}

seed();

//npx prisma db seed