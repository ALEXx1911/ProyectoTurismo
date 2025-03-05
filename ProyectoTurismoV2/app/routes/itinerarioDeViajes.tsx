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
import {
  PrimaryButton,
  DeleteButton,
  ErrorMessage,
  Input,
} from "~/components/forms";
import React from "react";
import { userLoggedRequired } from "~/utils/auth.server";
import { z } from "zod";
import { validateForm } from "~/utils/validation";

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
  await userLoggedRequired(request);
  //Nos aseguramos de que hay un usuario con la sesión iniciada para acceder a esta parte de la aplicación.
  const url = new URL(request.url);
  const q = url.searchParams.get("q") || "";
  const itinerarioTablas = await getAllItinerario(q);
  return json<LoaderData>({ itinerarioTablas });
};

const deleteItinerarioSchema = z.object({
  itinerarioID: z.string(),
});

const saveItinerarioNameSchema = z.object({
  itinerarioID: z.string(),
  itinerarioName: z.string().min(1, "El nombre del itinerario esta en blanco"),
  itinerarioComida: z
    .string()
    .min(1, "El nombre del itinerario esta en blanco"),
  itinerarioOcio: z.string().min(1, "El nombre del itinerario esta en blanco"),
  itinerarioViaje: z.string().min(1, "El nombre del itinerario esta en blanco"),
});

export const action: ActionFunction = async ({ request }) => {
  await userLoggedRequired(request);
  const formData = await request.formData();
  switch (formData.get("_action")) {
    case "createItinerario": {
      return createItinerario();
    }
    case "deleteItinerario": {
      return validateForm(
        formData,
        deleteItinerarioSchema,
        (data) => deleteItinerario(data.itinerarioID),
        (errors) => json({ errors })
      );
    }
    case "saveItinerarioName": {
      return validateForm(
        formData,
        saveItinerarioNameSchema,
        (data) =>
          saveItinerarioName(
            data.itinerarioID,
            data.itinerarioName,
            data.itinerarioComida,
            data.itinerarioOcio,
            data.itinerarioViaje
          ),
        (errors) => json({ errors })
      );
    }
    default: {
      return json({ error: "Acción no válida" }, { status: 400 });
    }
  }
};

export default function ItinerarioDeViajes() {
  const data = useLoaderData<LoaderData>() as LoaderData;
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
    <div className=" flex flex-col items-center">
      <div className="bg-yellow-50 w-full md:w-[70%] m-7 rounded-lg">
        <h1 className="text-4xl text-blue-300 font-semibold uppercase mt-6 text-center ">
          ITINERARIO DE VIAJES
        </h1>

        <createItinerarioFetcher.Form method="post">
          <PrimaryButton
            name="_action"
            value="createItinerario"
            className=" w-full md:w-fit md:mx-16"
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
    </div>
  );
}

type ItinerarioProps = {
  itinerario: ItinerarioType;
};

type FetcherData = {
  errors?: {
    itinerarioName?: string;
    itinerarioComida?: string;
    itinerarioOcio?: string;
    itinerarioViaje?: string;
    itinerarioID?: string;
  };
};

function Itinerario({ itinerario }: ItinerarioProps) {
  const deleteItinerarioFetcher = useFetcher<FetcherData>();
  const saveItinerarioNameFetcher = useFetcher<FetcherData>();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const form = e.currentTarget.form;
      if (!form) return;

      const inputs = Array.from(
        form.querySelectorAll("input")
      ) as HTMLInputElement[];
      const index = inputs.indexOf(e.currentTarget);

      if (index >= 0 && index < inputs.length - 1) {
        inputs[index + 1].focus();
      }
    }
  };

  const isDeletingItinerario =
    deleteItinerarioFetcher.formData?.get("_action") === "deleteItinerario" &&
    deleteItinerarioFetcher.formData?.get("itinerarioID") === itinerario.id;

  return isDeletingItinerario ? null : (
    <li
      className={classNames(
        "border-2 border-red-300 rounded-md p-4",
        "my-6 mx-16 grid"
      )}
    >
      <saveItinerarioNameFetcher.Form
        method="post"
        className="grid grid-cols-[1fr_auto] gap-4 items-center"
      >
        <div>
          <Input
            type="text"
            name="itinerarioName"
            defaultValue={itinerario.destino}
            placeholder="Destino"
            autoComplete="off"
            className="text-2xl font-extrabold "
            onKeyDown={handleKeyDown}
            tabIndex={1}
          />
          <ErrorMessage>
            {saveItinerarioNameFetcher.data?.errors?.itinerarioName}
          </ErrorMessage>
        </div>
        <button name="_action" value="saveItinerarioName" type="submit">
          <SaveIcon />
        </button>

        <div>
          <Input
            type="text"
            name="itinerarioComida"
            defaultValue={itinerario.comida}
            placeholder="Comida"
            autoComplete="off"
            className="text-2xl font-extrabold"
            onKeyDown={handleKeyDown}
            tabIndex={2}
          />
          <ErrorMessage>
            {saveItinerarioNameFetcher.data?.errors?.itinerarioComida}
          </ErrorMessage>
        </div>
        <button name="_action" value="itinerarioComida" type="submit">
          <SaveIcon />
        </button>

        <div>
          <Input
            type="text"
            name="itinerarioOcio"
            defaultValue={itinerario.ocio}
            placeholder="Ocio"
            autoComplete="off"
            className="text-2xl font-extrabold"
            onKeyDown={handleKeyDown}
            tabIndex={3}
          />
          <ErrorMessage>
            {saveItinerarioNameFetcher.data?.errors?.itinerarioOcio}
          </ErrorMessage>
        </div>
        <button name="_action" value="itinerarioOcio" type="submit">
          <SaveIcon />
        </button>

        <div>
          <Input
            type="text"
            name="itinerarioViaje"
            defaultValue={itinerario.viaje}
            placeholder="Viaje"
            autoComplete="off"
            className="text-2xl font-extrabold"
            onKeyDown={handleKeyDown}
            tabIndex={4}
          />
          <ErrorMessage>
            {saveItinerarioNameFetcher.data?.errors?.itinerarioViaje}
          </ErrorMessage>
        </div>
        <button name="_action" value="itinerarioViaje" type="submit">
          <SaveIcon />
        </button>

        <input type="hidden" name="itinerarioID" value={itinerario.id} />
        <ErrorMessage className="pl-2">
          {saveItinerarioNameFetcher.data?.errors?.itinerarioID}
        </ErrorMessage>
      </saveItinerarioNameFetcher.Form>

      <deleteItinerarioFetcher.Form method="post" className="pt-4">
        <input type="hidden" name="itinerarioID" value={itinerario.id} />
        <ErrorMessage className="pb-2">
          {deleteItinerarioFetcher.data?.errors?.itinerarioID}
        </ErrorMessage>
        <DeleteButton
          className="w-full"
          name="_action"
          value="deleteItinerario"
        >
          Eliminar itinerario
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
