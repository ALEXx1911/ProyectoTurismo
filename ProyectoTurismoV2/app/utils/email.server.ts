import nodemailer from 'nodemailer';
export type Message = {
  from: string;
  to: string;
  subject: string;
  html: string;
};

export async function sendEmail(message: Message): Promise<void> {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    const info = await transporter.sendMail(message);
    console.log('Correo enviado exitosamente:', info.response);
  } catch (error) {
    console.error('Error al enviar el correo:', error);
  }
}
