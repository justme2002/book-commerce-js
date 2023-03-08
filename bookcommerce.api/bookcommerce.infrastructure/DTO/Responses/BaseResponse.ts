import { TokenResponse } from "./TokenResponse";

export class BaseResponse 
{
  public status?: boolean
  public message?: string
  constructor({ status, message }: { status: boolean | undefined, message: string | undefined })
  {
    this.status = status
    this.message = message
  }
}