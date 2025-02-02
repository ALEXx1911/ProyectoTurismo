import { Form, Link, useActionData, useLoaderData, useSubmit } from "@remix-run/react";
import ReactModal from "react-modal";
import { ButtonSubmit, ErrorMessage } from "~/components/forms";
import { XIcon } from "~/components/icons";
import { ActionFunctionArgs, json, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { commitSession, getSession } from "~/sessions";
import { userNotLoggedRequired } from "~/utils/auth.server";
import { getUserById } from "~/models/user.server";
import { useRef, useState } from "react";
import { generateLoginValidateCode, sendCodeEmail, ValidateCodeProps, validateLoginCode } from "~/utils/validateLoginCode";

export const loader = async ({ request }: LoaderFunctionArgs) => {
    await userNotLoggedRequired(request);
    const url = new URL(request.url);
    const userId = url.searchParams.get("userId");
    if (!userId) {
        return redirect("/");
    }
    const user = await getUserById(userId);
    if (!user) {
        return redirect("/");
    }
    const cookieHeader = request.headers.get("cookie");
    const session = await getSession(cookieHeader);
    if(!session.get("code")){
        const code = generateLoginValidateCode();
        if (process.env.NODE_ENV === "production") {
            await sendCodeEmail(user.id,code.code);
        }else{
            console.log("Código de validación: ",code.code);
        }
        session.set("code",code);
    }
    return json({
        user: {
            name: user.name,
            email: user.email
        },
    },{
        headers:{
            "Set-Cookie":await commitSession(session)
        }
  });
};

export async function action({ request }: ActionFunctionArgs) {
  await userNotLoggedRequired(request);
  const formData = await request.formData();
  
  const codeFromForm = formData.get("codeConfirm") as string;

  if (!/^\d{6}$/.test(codeFromForm)) {
    return json({ errors: {code:"El código debe ser un número de 6 dígitos."} });
  }
  //Validamos que el código sea de 6 dígitos.
  const codeConfirm: ValidateCodeProps = {
    code: parseInt(codeFromForm, 10),
    createdAt: Date.now()
  };

 return await validateLoginCode(request, codeConfirm);
}

if (typeof window !== "undefined") {
  ReactModal.setAppElement("body");
}

export default function ValidateUser() {
  const data = useLoaderData<typeof loader>();
  const actionData = useActionData<any>();
  const [code, setCode] = useState(["", "", "", "", "", ""]);

  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < code.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
    if (event.key === "ArrowLeft" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
    if (event.key === "ArrowRight" && index < code.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      event.preventDefault();
      let newValue = parseInt(code[index] || "0", 10);
      newValue = event.key === "ArrowUp" ? Math.min(newValue + 1, 9) : Math.max(newValue - 1, 0);
      handleChange(index, newValue.toString());
    }
  };
  const submit=useSubmit();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullCode = code.join("");
    const formData = new FormData(e.target as HTMLFormElement);
    formData.set("codeConfirm", fullCode);
    submit(formData, { method: "post" }); 
  };
  //En esta variable se junta el valor de todos los "input" para obtener el código. Después de 
  //obtener el código, lo enviamos al "action".

  return (
    <ReactModal isOpen className="modal">
      <div className="modal__container">
        <div className="modal__container__header">
          <Link
            to="/login"
            replace
            className="modal__container__header__link"
          >
            <XIcon />
          </Link>
          <h1 className="modal__container__header__title">Hola, {data?.user.name}. Verifique que es usted</h1>
        </div>
        <Form method="post" className="modal__container__form" onSubmit={(e)=>handleSubmit(e)}>
          <h2 className="modal__container__form__header">Introduzca el código que hemos enviado a {data?.user.email}</h2>
          <div className="modal__container__form__container space-x-2">
            {code.map((value, index) => (
              <input
                key={index}
                ref={(el) => (inputsRef.current[index] = el)}
                type="text"
                value={value}
                name="code"
                autoComplete="off"
                defaultValue={""}
                maxLength={1}
                inputMode="numeric"
                pattern="[0-9]*"
                className="modal__container__form__container__input"
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onFocus={(e) => e.target.select()}
              />
            ))}
          </div>
          <ErrorMessage>{actionData?.errors?.code}</ErrorMessage>
          
           <ButtonSubmit>
            Enviar
           </ButtonSubmit>
       
        </Form>
      </div>
    </ReactModal>
  );
}
