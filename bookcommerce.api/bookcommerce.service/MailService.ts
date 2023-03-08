import nodemailer from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { BaseResponse } from '../bookcommerce.infrastructure/DTO/Responses/BaseResponse';
import { IMailOptions, IMailService } from './Interfaces/IMailService';

export class MailService implements IMailService
{
  constructor()
  {
    
  }

  public async SendMail(sendMailOptions: IMailOptions): Promise<BaseResponse | undefined> {
    const transporter = this.createTransport()
    const mailOptions = this.writeMail(sendMailOptions)
    try {
      const result = await transporter.sendMail(mailOptions)
      return new BaseResponse({
        status: true,
        message: "sent a verification mail to user"
      })
    } catch (error) {
      console.log(error)
      return new BaseResponse({
        status: false,
        message: "failed to send"
      })
    }
  }

  private createTransport(): nodemailer.Transporter<SMTPTransport.SentMessageInfo>
  {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL,
        pass: process.env.PASSWORD
      }
    })
    return transporter
  }

  private writeMail({ from, to, subject, text }: IMailOptions) 
  {
    const mailOptions = {
      from,
      to,
      subject,
      text
    }
    return mailOptions
  }
}