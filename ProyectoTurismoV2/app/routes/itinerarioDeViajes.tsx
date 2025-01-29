import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import classNames from "classnames";
import {
  getAllItinerario,
  createItinerario,
  deleteItinerario,
} from "~/models/itinerario.server";
import { SearchIcon, PlusIcon } from "~/components/icons";
import {
  ActionFunction,
  Form,
  LoaderFunction,
  useFetcher,
  useNavigation,
  useSearchParams,
} from "react-router-dom";
import { PrimaryButton, DeleteButton } from "~/components/forms";
import React from "react";
type itinerario = {
  id: string;
  destino: string;
  comida: string;
  ocio: String;
  viaje: string;
};

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
  switch (formData.get("_action")) {
    case "createItinerario": {
      return createItinerario();
    }
    case "deleteItinerario": {
      const itinerariId = formData.get("itinerariId");
      if (typeof itinerariId !== "string") {
        return json({
          errors: { itinerariId: "itinerario ID debe ser un string" },
        });
      }
      return deleteItinerario(itinerariId);
    }
    default: {
      return null;
    }
  }
};

export default function itinerarioDeViajes() {
  const data = useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();
  const createItinerarioFetcher = useFetcher();
  const navigation = useNavigation();
  const containerRef = React.useRef<HTMLUListElement>(null);

  const isSearching = navigation.formData?.has("q");
  const isCreatingItineraio =
    createItinerarioFetcher.formData?.get("_action") === "createItinerario";
  React.useEffect(() => {
    if (!isCreatingItineraio && containerRef.current) {
      containerRef.current.scrollLeft = 0;
    }
  }, [isCreatingItineraio]);

  return (
    <div>
      <h1 className="text-4xl text-red-600 font-semibold uppercase mt-6 text-center">
        ITINERARIO DE VIAJES
      </h1>
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
      <createItinerarioFetcher.Form method="post">
        <PrimaryButton
          name="_action"
          value="createItinerario"
          className="mt-4 w-full md:w-fit"
          isLoading={isCreatingItineraio}
        >
          <PlusIcon />
          <span className="pl-2">
            {isCreatingItineraio ? "creating itinerario" : "crear itinerario"}
          </span>
        </PrimaryButton>
      </createItinerarioFetcher.Form>
      <ul
        className={classNames(
          "flex-col gap-8 overflow-x-auto mt-4 pb-4",
          "snap-x snap-mandatory",
          isCreatingItineraio ? "bg-red-100" : ""
        )}
      >
        {data.itinerarioTablas.map((itinerario) => (
          <Itinerario key={itinerario.id} itinerario={itinerario} />
        ))}
      </ul>
    </div>
  );
}
type ItineraioProps = {
  itinerario: {
    id: String;
    destino: string;
    comida: string;
    ocio: String;
    viaje: string;
  };
};

function Itinerario({ itinerario }: ItineraioProps) {
  const deleteItinerarioFecher = useFetcher();

  const isDeletingItinerario =
    deleteItinerarioFecher.formData?.get("_action") === "deleteItinerario" &&
    deleteItinerarioFecher.formData?.get("itinerariId") === itinerario.id;

  return (
    <li
      key={itinerario.id}
      className={classNames(
        "border-2 border-red-500 rounded-md p4",
        "my-6 mx-16 grid "
      )}
    >
      <h1 className="text-2xl font-extrabold md-2">{itinerario.destino}</h1>
      <p>{itinerario.comida}</p> {}
      <deleteItinerarioFecher.Form method="post" className="pt-8">
        <input type="hidden" name="itinerariId" value={itinerario.id} />
        <DeleteButton
          className="w-full"
          name="_action"
          value="deleteItinerario"
          isLoading={isDeletingItinerario}
        >
          {isDeletingItinerario
            ? "Eliminando itinerarios"
            : "Eliminar itinerarios"}
        </DeleteButton>
      </deleteItinerarioFecher.Form>
    </li>
  );
}
