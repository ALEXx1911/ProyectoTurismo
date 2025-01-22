import db from "~/db.server";

//Funcion para crear un itinerario del usuario
//Temporal todavia tiene el user ?
export function createItinerario() {
  return db.itinerario.create({
    data: {
      destino: "Itinerario",
      comida: "Comida",
      ocio: "Ocio",
      viaje: "Viaje",
    },
  });
}
