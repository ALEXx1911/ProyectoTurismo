import { json, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ProvincieDetail } from "~/components/provinces"; // 📌 Componente personalizado
import { getProvinceById } from "~/models/provinces.server";

export const loader = async ({ params }: LoaderFunctionArgs) => {
    const provinceId = params?.id;
    
    if (typeof provinceId === "string") {
        const province = await getProvinceById(provinceId);

        if (!province) {
            return redirect("/"); // Si no existe la provincia, redirige a la página principal
        }

        return json(province);
    }

    return redirect("/");
};

export default function Province() {
    const data = useLoaderData<typeof loader>();

    if (!data) {
        return <h2 className="text-center text-red-600 text-lg">No se encontró la provincia</h2>;
    }

    return (
        <div className="container mx-auto p-6">
            <ProvincieDetail 
                name={data.name} 
                imageUrl={data.imageUrl} 
                detaildes={data.detaildes}
                desparrafo={data.desparrafo}
                detailfest={data.detailfest}
                festparrafo={data.festparrafo}
                festUrl={data.festUrl}
                detailfood={data.detailfood}
                foodparrafo={data.foodparrafo}
                foodUrl={data.foodUrl}
                detailsite={data.detailsite}
                siteparrafo={data.siteparrafo}
                siteUrl={data.siteUrl}
            />
        </div>
    );
}

//Aquí se va a ver la información adicional de la provincia.