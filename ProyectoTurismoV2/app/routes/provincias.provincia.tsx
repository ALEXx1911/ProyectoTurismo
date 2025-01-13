import { PrismaClient } from "@prisma/client";
import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import db from "~/db.server";
// Define el tipo de Provincia
type Province = {
  id: number;
  name: string;
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
      <h1>Hola</h1>
      <p>Aquí se ve cada provincia específica</p>
      <ul>
        {data.provincialstables.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
