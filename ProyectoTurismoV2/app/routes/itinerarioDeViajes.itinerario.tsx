import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import classNames from "classnames";
import { getAllProvincies, createProvinces } from "~/models/provinces.server";
import {getAllItinerario, createItinerario} from "~/models/itinerario.server";
import { SearchIcon, PlusIcon } from "~/components/icons";
import {
  ActionFunction,
  Form,
  LoaderFunction,
  LoaderFunctionArgs,
  useNavigation,
  useSearchParams,
} from "react-router-dom";
import { PrimaryButton, DeleteButton } from "~/components/forms";

type loaderData = {
  itinerarioTablas: Awaited<ReturnType<typeof getAllItinerario>>;
};
export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const itinerarioTablas = await getAllItinerario(q);
  return json({ itinerarioTablas });
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  return createItinerario();
};

export default function Itinerario() {
  const data = useLoaderData() as loaderData;
  const [searchParams] = useSearchParams();
  const navigation = useNavigation();
  const isSearching = navigation.formData?.has("q");
  const isCreatingItineraio = navigation.formData?.has("createItinerario");
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
          placeholder="Buscar"
          className="w-full py-3 px-2 outline-none"
        />
      </Form>
      <Form method="post">
        <PrimaryButton
          name="_action"
          value="createItinerario"
          className={classNames(
            "mt-4 w-full md:w-fit",
            isCreatingItineraio ? "bg-red-400" : ""
          )}
        >
          <PlusIcon />
          <span className="pl-2">
            {isCreatingItineraio ? "creating itinerario" : "crear itinerario"}
          </span>
        </PrimaryButton>
      </Form>
      <ul
        className={classNames(
          "flex gap-8 overflow-x-auto mt-4 pb-4",
          "snap-x snap-mandatory",
          isCreatingItineraio ? "bg-red-500" : ""
        )}
      >
        {data.itinerarioTablas.map((itinerario) => (
          <li
            key={itinerario.id}
            className={classNames(
              "border-2 border-red-500 rounded-md p4",
              "w-[calc(100vw-2rem)] flex-none snap-center"
            )}
          >
            <h1 className="text-2xl font-extrabold md-2">{itinerario.destino}</h1>
            <p>{itinerario.comida}</p> {}
            <Form method="post" className="pt-8">
              <DeleteButton className="w-full" name="deleteItinerario">
                Eliminar itinerarios
              </DeleteButton>
            </Form>
          </li>
        ))}
      </ul>
    </div>
  );
}
