import { PrismaClient } from "@prisma/client";
//import { data } from "@remix-run/react";
const db = new PrismaClient();

function crearUser(){
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

}

seed();

//npx prisma db seed