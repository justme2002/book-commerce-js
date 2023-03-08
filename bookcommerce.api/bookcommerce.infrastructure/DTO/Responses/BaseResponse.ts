import { TokenResponse } from "./TokenResponse";

export class BaseResponse 
{
  constructor(public status: boolean, public message: string)
  {

  }
}