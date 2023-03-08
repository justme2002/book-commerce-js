import express, { Application } from 'express'
import { MailController } from '../bookcommerce.controller/MailController'
import { authMiddleware } from '../bookcommerce.middleware/AuthMiddleware'
import { MailService } from '../bookcommerce.service/MailService'
export const MailRouter = express.Router()

//DI
const mailController = new MailController({
  mailService: new MailService()
})

MailRouter.get("/send-mail", mailController.sendMail as Application)
