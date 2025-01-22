import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import classNames from "classnames";
import { getAllProvincies, createProvinces } from "~/models/provinces.server";
import { SearchIcon, PlusIcon } from "~/components/icons";
import {
  ActionFunction,
  Form,
  LoaderFunction,
  LoaderFunctionArgs,
  useNavigation,
  useSearchParams,
} from "react-router-dom";
import { Navigation } from "swiper/modules";
import { PrimaryButton, DeleteButton } from "~/components/forms";
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

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  return createProvinces();
};

export default function Provincia() {
  const data = useLoaderData() as loaderData;
  const [searchParams] = useSearchParams();
  const navigation = useNavigation();
  const isSearching = navigation.formData?.has("q");
  const isCreatingProvince = navigation.formData?.has("CreateProvince");
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
      <Form method="post">
        <PrimaryButton
          name="_action"
          value="createProvince"
          className={classNames(
            "mt-4 w-full md:w-fit",
            isCreatingProvince ? "bg-red-400" : ""
          )}
        >
          <PlusIcon />
          <span className="pl-2">
            {isCreatingProvince ? "creating Province" : "crete Province"}
          </span>
        </PrimaryButton>
      </Form>
      <ul
        className={classNames(
          "flex gap-8 overflow-x-auto mt-4 pb-4",
          "snap-x snap-mandatory",
          isCreatingProvince ? "bg-red-500" : ""
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
            <h1 className="text-2xl font-extrabold md-2">{province.name}</h1>
            <p>{province.description}</p> {}
            <Form method="post" className="pt-8">
              <DeleteButton className="w-full" name="deleteProvince">
                Delete Province
              </DeleteButton>
            </Form>
          </li>
        ))}
      </ul>
    </div>
  );
}
