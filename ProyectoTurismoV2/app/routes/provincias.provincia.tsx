import { PrismaClient } from "@prisma/client";
import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import classNames from "classnames";
import db from "~/db.server";
import { getProvincies } from "~/models/provinces.server";
// Define el tipo de Provincia
type Province = {
  id: number;
  name: string;
  description: String;
};

export const loader: LoaderFunction = async () => {
  const db = new PrismaClient();
  const provincialstables = await db.provinces.findMany();
  return json({ provincialstables });
};

export default function Provincia() {
  const data = useLoaderData<{ provincialstables: Province[] }>();

  return (
    <div>
      <ul
        className={classNames(
          "flex gap-8 overflow-x-auto",
          "snap-x snap-mandatory"
        )}
      >
        {data.provincialstables.map((province) => (
          <li
            key={province.id}
            className={classNames(
              "border-2 border-red-500 rounded-md p4",
              "w-[calc(100vw-2rem)] flex-none snap-center"
            )}
          >
            <h1 className="text-2xl font-extrabold">{province.name}</h1>
            <p>{province.description}</p> {}
          </li>
        ))}
      </ul>
    </div>
  );
}
