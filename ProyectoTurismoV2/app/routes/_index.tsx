import type { MetaFunction } from "@remix-run/node";
export const meta: MetaFunction = () => {
  return [
    { title: "TurismoEspaña" },
    { name: "description", content: "" },
  ];
};

export default function Index() {
  return (
    <div>
        <p>Aquí va a ir el contenido de la página principal.</p>
    </div>
  );

}
//*Nota: Vamos a utilizar "NavLinks" para que la página no se recargue.