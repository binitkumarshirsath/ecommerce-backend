import nodemailer from "nodemailer";
import { ENV_CONFIG } from "./env/env-config.js";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // `true` for port 465, `false` for all other ports
  auth: {
    user: `${ENV_CONFIG.MAIL_USER}`,
    pass: `${ENV_CONFIG.MAIL_PASS}`,
  },
});

interface MailParams {
  to: string;
  subject: string;
  text: string;
  html: string;
}
const sendMail = async ({ to, subject, html, text }: MailParams) => {
  const info = await transporter.sendMail({
    from: "princevinitkumar007@gmail.com",
    to,
    subject,
    text,
    html,
  });
  console.log(
    `Email sent successfully to : ${to} || MessageID : ${info.messageId}`
  );
};

export { sendMail };
