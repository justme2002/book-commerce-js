import { BaseResponse } from "./BaseResponse"

export class TokenResponse extends BaseResponse
{
  constructor(Status: boolean,  Message: string, public AccessToken?: string, public RefreshToken?: string)
  {
    super(Status, Message)
  }
}