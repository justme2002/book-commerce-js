import { BaseResponse } from "./BaseResponse"

export class TokenResponse extends BaseResponse
{
  public accessToken?: string
  public refreshToken?: string
  constructor({ status, message, accessToken, refreshToken }: { status?: boolean, message?: string, accessToken: string | undefined , refreshToken: string | undefined})
  {
    super({ status, message })
    this.accessToken = accessToken
    this.refreshToken = refreshToken
  }
}