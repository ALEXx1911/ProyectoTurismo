import db from "~/db.server";

//Funcion para crear un itinerario del usuario
//Temporal todavia tiene el user ?
export function createItinerario() {
  return db.itinerario.create({
    data: {
      userId: "1",
      destino: "Itinerario",
      comida: "Comida",
      ocio: "Ocio",
      viaje: "Viaje",
    },
  });
}
