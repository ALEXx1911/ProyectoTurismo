import { z } from "zod";

type FieldErrors = {
  [key: string]: string;
};

export function validateForm<T>(
  formData: FormData,
  zodSchema: z.Schema<T>,
  successFn: (data: T) => unknown,
  errorsFn: (errors: FieldErrors) => unknown
) {
  const result = zodSchema.safeParse(Object.fromEntries(formData));
  if (!result.success) {
    const errors: FieldErrors = {};
    result.error.issues.forEach((issue) => {
      const path = issue.path.join(".");
      errors[path] = issue.message;
    });
    return errorsFn(errors);
  }
  //Si el resultado no es válido, se hace un array con los errores.
  return successFn(result.data);
}
//Función de validación de un formulario.
