import { json, ActionFunction, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import classNames from "classnames";
import {
  getAllItinerario,
  createItinerario,
  deleteItinerario,
  saveItinerarioName,
} from "~/models/itinerario.server";
import { SearchIcon, PlusIcon, SaveIcon } from "~/components/icons";
import {
  Form,
  useFetcher,
  useNavigation,
  useSearchParams,
} from "@remix-run/react";
import { PrimaryButton, DeleteButton } from "~/components/forms";
import React from "react";

type ItinerarioType = {
  id: string;
  destino: string;
  comida: string;
  ocio: string;
  viaje: string;
};

type LoaderData = {
  itinerarioTablas: Awaited<ReturnType<typeof getAllItinerario>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q") || "";
  const itinerarioTablas = await getAllItinerario(q);
  return json<LoaderData>({ itinerarioTablas });
};

type FieldErrors = { [key: string]: string };

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  switch (formData.get("_action")) {
    case "createItinerario": {
      return createItinerario();
    }
    case "deleteItinerario": {
      const itinerariId = formData.get("itinerariId");
      if (typeof itinerariId !== "string") {
        return json(
          { errors: { itinerariId: "ID debe ser un string" } },
          { status: 400 }
        );
      }
      return deleteItinerario(itinerariId);
    }
    case "saveItinerarioName": {
      const itinerariId = formData.get("itinerariId");
      const itinerarioName = formData.get("itinerarioName");
      const errors: FieldErrors = {};

      if (!itinerarioName) {
        errors.itinerarioName = "Nombre requerido";
      }
      if (typeof itinerarioName !== "string") {
        errors.itinerarioName = "Nombre inválido";
      }
      if (typeof itinerariId !== "string") {
        errors.itinerariId = "ID inválido";
      }

      if (Object.keys(errors).length > 0) {
        return json({ errors }, { status: 400 });
      }

      return saveItinerarioName(
        itinerariId as string,
        itinerarioName as string
      );
    }
    default: {
      return json({ error: "Acción no válida" }, { status: 400 });
    }
  }
};

export default function ItinerarioDeViajes() {
  const data = useLoaderData<LoaderData>();
  const [searchParams] = useSearchParams();
  const createItinerarioFetcher = useFetcher();
  const navigation = useNavigation();
  const containerRef = React.useRef<HTMLUListElement>(null);

  const isSearching = navigation.formData?.has("q");
  const isCreatingItinerario =
    createItinerarioFetcher.formData?.get("_action") === "createItinerario";

  React.useEffect(() => {
    if (!isCreatingItinerario && containerRef.current) {
      containerRef.current.scrollLeft = 0;
    }
  }, [isCreatingItinerario]);

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
          isLoading={isCreatingItinerario}
        >
          <PlusIcon />
          <span className="pl-2">
            {isCreatingItinerario
              ? "Creando itinerario..."
              : "Crear itinerario"}
          </span>
        </PrimaryButton>
      </createItinerarioFetcher.Form>

      <ul
        ref={containerRef}
        className={classNames(
          "flex-col gap-8 overflow-x-auto mt-4 pb-4",
          "snap-x snap-mandatory",
          isCreatingItinerario ? "bg-red-100" : ""
        )}
      >
        {data.itinerarioTablas.map((itinerario) => (
          <Itinerario key={itinerario.id} itinerario={itinerario} />
        ))}
      </ul>
    </div>
  );
}

type ItinerarioProps = {
  itinerario: ItinerarioType;
};

function Itinerario({ itinerario }: ItinerarioProps) {
  const deleteItinerarioFetcher = useFetcher();
  const saveItinerarioNameFetcher = useFetcher();

  const isDeletingItinerario =
    deleteItinerarioFetcher.formData?.get("_action") === "deleteItinerario" &&
    deleteItinerarioFetcher.formData?.get("itinerariId") === itinerario.id;

  return (
    <li
      className={classNames(
        "border-2 border-red-500 rounded-md p-4",
        "my-6 mx-16 grid"
      )}
    >
      <saveItinerarioNameFetcher.Form method="post">
        <div className="flex items-center">
          <input
            type="text"
            name="itinerarioName"
            defaultValue={itinerario.destino}
            placeholder="Destino"
            autoComplete="off"
            className={classNames(
              "text-2xl font-extrabold mb-2 w-full outline-none",
              "border-b-2 border-b-gray-200 focus:border-b-red-500"
            )}
          />
          <button
            name="_action"
            value="saveItinerarioName"
            className="ml-4"
            type="submit"
          >
            <SaveIcon />
          </button>
          <input type="hidden" name="itinerariId" value={itinerario.id} />
        </div>
      </saveItinerarioNameFetcher.Form>

      <deleteItinerarioFetcher.Form method="post" className="pt-4">
        <input type="hidden" name="itinerariId" value={itinerario.id} />
        <DeleteButton
          className="w-full"
          name="_action"
          value="deleteItinerario"
          isLoading={isDeletingItinerario}
        >
          {isDeletingItinerario ? "Eliminando..." : "Eliminar itinerario"}
        </DeleteButton>
      </deleteItinerarioFetcher.Form>
    </li>
  );
}

export function ErrorBoundary() {
  return (
    <div className="text-red-500 p-4 text-center">
      ¡Algo salió mal! Por favor intenta nuevamente.
    </div>
  );
}
