import db from "~/db.server";

//Funcion para crear un itinerario del usuario
//Temporal todavia tiene el user ?
export function createItinerario() {
  return db.itinerario.create({
    data: {
      destino: "Destino",
      comida: "Comida",
      ocio: "Ocio",
      viaje: "Viaje",
    },
  });
}

/*
Funcion para obtener todos los itinerarios de forma desc, todavia esta que solo muestre 8
*/
export function getAllItinerario(query: string | null) {
  return db.itinerario.findMany({
    where: {
      destino: {
        contains: query ?? "",
      },
    },
    take: 8,
    orderBy: {
      createdAt: "desc",
    },
  });
}

export function deleteItinerario(itinerariId: string) {
  return db.itinerario.delete({
    where: {
      id: itinerariId,
    },
  });
}
export function saveItinerarioName(
  itinerario: string,
  itinerarioName: string,
  itinerarioComida: string,
  itinerarioOcio: string,
  itinerarioViaje: string
) {
  return db.itinerario.update({
    where: {
      id: itinerario,
    },
    data: {
      destino: itinerarioName,
      comida: itinerarioComida,
      ocio: itinerarioOcio,
      viaje: itinerarioViaje,
    },
  });
}
