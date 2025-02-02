import { json, redirect } from "@remix-run/node";
import { getUserById } from "~/models/user.server";
import { commitSession, getSession } from "~/sessions";
import { Message, sendEmail } from "./email.server";

export type ValidateCodeProps={
    code:number;
    createdAt:number;
}
export function generateLoginValidateCode(){
    const code = Math.floor(100000 + Math.random() * 900000);
    const createdAt=Date.now();
    const validateCode:ValidateCodeProps={
        code:code,
        createdAt:createdAt
    }
    return validateCode;
}
//Función para generar el código de validación.

export async function sendCodeEmail(userId:string,code:number){
    const user=await getUserById(userId);
    if(!user){
        return;
    }
    const message:Message={
        from:`TurismoEspaña <${process.env.MAILGUN_FROM}>`,
        to: user.email,
        subject: "Código de verificación para iniciar sesión", 
        html: `
            <h1>Hola, ${user.name}!</h1>
            <p>Tu código de verificación para iniciar sesión es:</p>
            <h2 style="text-align: center; font-size: 24px; color: #007BFF;">${code}</h2>
            <p>Este código es válido por un tiempo limitado. No lo compartas con nadie.</p>
            <br>
            <p>Si no solicitaste este código, puedes ignorar este mensaje.</p>
            <br>
            <p>Saludos, <br> El equipo de soporte de TurismoEspaña</p>
        `
    };
    return sendEmail(message);
 }
 
export async function validateLoginCode(request:Request,codeConfirmation:ValidateCodeProps){
    const cookieHeader = request.headers.get("cookie");
    const session = await getSession(cookieHeader);
    const code=session.get("code");
    const codeExpiresAt = code.createdAt + 5 * 60 * 1000; 
    //Establecemos que el código de la sesión va a dejar de ser válido en 5 minutos.
    const url = new URL(request.url);
    const userId = url.searchParams.get("userId");
    //Extreamos el ID del usuario de la ruta.
    if (!userId) {
      return redirect("/");
    }
    //Si no hay ningún "userId" reedirigimos al usuario a la página principal.
    const user = await getUserById(userId);
    if (!user) {
      return redirect("/");
    }
  
    if(Date.now()>codeExpiresAt){
        session.unset("code");
        //Si ya han pasado los 5 minutos, eliminamos el código de la sesión.
        return json({errors:{code: "El código de validación ha expirado. Ya mismo le enviamos otro."}},{
            headers:{
                "Set-Cookie":await commitSession(session)
            }
        })
    }
    if(code.code!==codeConfirmation.code){
        return json({ errors: { code: "El código introducido no es válido." } });
    }else{
        session.unset("code");
        //Una vez validado, eliminamos el "code" de la sesión.
        session.set("userId", undefined);
        session.set("username", undefined);
        session.set("userId", user.id);
        session.set("username", user.name);
        return redirect("/", {
            headers: {
            "Set-Cookie": await commitSession(session)
            }
        });
    }
}
//Función para validar que el código de confirmación se ha enviado a tiempo y que es el mismo que 
//el "code".