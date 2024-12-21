import { PrismaClient } from "@prisma/client/extension";
import { data } from "@remix-run/react";
const db = new PrismaClient();

function seed() {
  db.provinces.create({
    data: {
      id: "121",
      userId: "12",
      name: "alf",
      description: "sadasdad",
      imageUrl: "sad",
      climate: "asdas",
      beaches: "dasd",
      recommendedPlaces: "asd",
      typicalFood: "ad",
      festivities: "ad",
    },
  });
}
