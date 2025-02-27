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

export async function sendCodeEmail(userId: string, code: number): Promise<void> {
    const user = await getUserById(userId);
    if (!user) {
      return;
    }
    const currentYear = new Date().getFullYear();
    const message: Message = {
      from: `TurismoEspaña <${process.env.EMAIL_FROM}>`,
      to: user.email,
      subject: 'Código de verificación para iniciar sesión',
      html: `
        <!DOCTYPE html>
        <html lang="es">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Correo de verificación TurismoEspaña</title>
          </head>
          <body
            style="font-family: Arial, sans-serif; background-color: #f4f7fa; margin: 0; padding: 0.05rem; color: #333;"
          >
            <div
              style="max-width: 600px; margin: 20px auto; background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);"
            >
              <h1
                style="text-align: center; font-size: 28px; color: #333; font-weight: bold; margin-bottom: 20px;"
              >
                ¡Hola, ${user.name}!
              </h1>
    
              <p
                style="font-size: 16px; color: #555; line-height: 1.5; margin-bottom: 20px;"
              >
                Este es tu correo de verificación para acceder a tu cuenta de
                <strong>TurismoEspaña</strong>. Tu código de verificación para iniciar
                sesión es el siguiente:
              </p>
    
              <h2
                style="text-align: center; font-size: 30px; color: #007bff; background-color: #e7f3ff; padding: 15px; border-radius: 5px; margin: 0;"
              >
                ${code}
              </h2>
    
              <p
                style="font-size: 14px; color: #777; line-height: 1.5; margin-top: 20px;"
              >
                Este código es válido por un tiempo limitado. No lo compartas con
                nadie.
              </p>
    
              <p
                style="font-size: 14px; color: #777; line-height: 1.5;"
              >
                Si no solicitaste este código, puedes ignorar este mensaje sin
                ningún problema.
              </p>
    
              <p
                style="font-size: 16px; color: #555; text-align: left; margin-top: 20px;"
              >
                Saludos,<br />
                El equipo de soporte de <strong>TurismoEspaña</strong>.
              </p>
    
              <p
                style="text-align: center; font-size: 14px; color: rgba(0, 0, 0, 0.54); margin-top: 20px;"
              >
                © ${currentYear} TurismoEspaña. Todos los derechos reservados.
              </p>
            </div>
          </body>
        </html>
      `,
    };
    return await sendEmail(message);
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