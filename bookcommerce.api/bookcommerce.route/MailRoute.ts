import { Express } from "express";
import { IDIContainer } from 'rsdi' 
import { MailController } from "../bookcommerce.controller/MailController";

export default function mapMailRoute (app?: Express, diContainer?: IDIContainer)
{
  const mailController = diContainer?.get(MailController)
  app?.route("/send-mail")
    .get(mailController!.sendMail.bind(mailController))
}