import { MailService } from "../bookcommerce.service/MailService";
import { Request, Response } from 'express'
import { v4 as uuid } from 'uuid'
import { IMailOptions } from "../bookcommerce.service/Interfaces/IMailService";
import { BaseResponse } from "../bookcommerce.infrastructure/DTO/Responses/BaseResponse";

export class MailController
{
  public mailService?: MailService
  constructor({ mailService }: { mailService: MailService })
  {
    this.mailService = mailService
  }

//POST /send-mail
  public async sendMail(req: Request, res: Response) : Promise<Response>
  {
    const mailService = new MailService()
    const { to } = req.query
    const mailOptions: IMailOptions = {
      from: process.env.GMAIL,
      to: to as string,
      subject: "Register account verification mail",
      text: `${req.protocol}://${req.hostname}:${process.env.PORT}/active?uuid=${uuid()}?email=${to}`
    }
    const result = await mailService?.SendMail(mailOptions)
    if (!result?.status)
    {
      return res.status(400).json(new BaseResponse({
        status: false,
        message: "failed to send mail"
      }))
    }
    return res.status(200).json(new BaseResponse({
      status: true,
      message: "mail sent"
    }))
  }
}