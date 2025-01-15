import { PrismaClient } from "@prisma/client";
import { type LoaderArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import classNames from "classnames";
import db from "~/db.server";
import { getAllProvincies } from "~/models/provinces.server";
import { SearchIcon } from "~/components/icons";
import {
  Form,
  LoaderFunction,
  LoaderFunctionArgs,
  useNavigation,
  useSearchParams,
} from "react-router-dom";
import { Navigation } from "swiper/modules";
// Define el tipo de Provincia
type Province = {
  id: number;
  name: string;
  description: String;
};
type loaderData = {
  provincialstables: Awaited<ReturnType<typeof getAllProvincies>>;
};
export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const provincialstables = await getAllProvincies(q);
  return json({ provincialstables });
};

export default function Provincia() {
  const data = useLoaderData() as loaderData;
  const [searchParams] = useSearchParams();
  const navigation = useNavigation();
  const isSearching = navigation.formData?.has("q");
  return (
    <div>
      <Form
        className={classNames(
          "flex border-2 border-gray-300 rounded-md",
          "focus-within:border-red-500 md:w-80",
          isSearching ? "animate-pulse" : ""
        )}
      >
        <button className="px-2 mr-1">
          <SearchIcon />
        </button>
        <input
          defaultValue={searchParams.get("q") ?? ""}
          type="text"
          name="q"
          autoComplete="off"
          placeholder="Search"
          className="w-full py-3 px-2 outline-none"
        />
      </Form>
      <Form reloadDocument>
        <button></button>
      </Form>
      <ul
        className={classNames(
          "flex gap-8 overflow-x-auto mt-4",
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
