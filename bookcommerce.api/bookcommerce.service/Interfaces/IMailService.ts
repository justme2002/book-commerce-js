import { BaseResponse } from "../../bookcommerce.infrastructure/DTO/Responses/BaseResponse"

export interface IMailService
{
  SendMail(sendMailOptions: IMailOptions): Promise<BaseResponse | undefined>
}

export interface IMailOptions
{
  from: string | undefined,
  to: string | undefined,
  subject: string | undefined,
  text: string | undefined
}
