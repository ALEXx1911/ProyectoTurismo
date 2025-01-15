import db from "~/db.server";

export async function provincesToFavorites(userId: string, provinceId: string) {
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });
  const province = await db.provinces.findUnique({
    where: {
      id: provinceId,
    },
  });

  if (user !== null && province !== null) {
    return await db.ilike.create({
      data: {
        users: {
          connect: {
            id: user.id,
          },
        },
        provinces: {
          connect: {
            id: province.id,
          },
        },
      },
    });
  }

  return null;
}
//Función que añade una provincia a las favoritas de un usuario.

export async function deleteProvinceFromFavorites(
  userId: string,
  provinceId: string
) {
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });
  const province = await db.provinces.findUnique({
    where: {
      id: provinceId,
    },
  });

  if (user !== null && province !== null) {
    return await db.ilike.deleteMany({
      where: {
        users: {
          some: {
            id: user.id,
          },
        },
        provinces: {
          some: {
            id: province.id,
          },
        },
      },
    });
  }

  return null;
}
//Función que elimina una provincia a las favoritas de un usuario.
//Función para obtener las provicias y verlas en el apartado de todas las provincias.
export function getProvincies() {
  return db.provinces.findMany({
    take: 8,
    orderBy: {
      name: "asc",
    },
  });
}

//funcion de pruebas
export function getAllProvincies(query: string | null) {
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

export function createProvinces() {
  return db.provinces.create({
    data: {
      name: "New provinces",
      description: "",
      imageUrl: "",
      climate: "",
      beaches: "",
      recommendedPlaces: "",
      typicalFood: "",
      festivities: "",
      ccaaName: "",
    },
  });
}
