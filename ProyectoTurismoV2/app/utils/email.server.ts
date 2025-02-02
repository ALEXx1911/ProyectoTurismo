import formData from "form-data";
import Mailgun from "mailgun.js";

if (!process.env.MAILGUN_API_KEY) {
  throw new Error("MAILGUN_API_KEY is required");
}

const mailgun = new Mailgun(formData);
const client = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY,
});

export type Message = {
  from: string;
  to: string;
  subject: string;
  html: string;
};
export function sendEmail(message: Message) {
  if (typeof process.env.MAILGUN_DOMAIN !== "string") {
    throw new Error("MAILGUN_DOMAIN is required");
  }

  return client.messages.create(process.env.MAILGUN_DOMAIN, message);
}

