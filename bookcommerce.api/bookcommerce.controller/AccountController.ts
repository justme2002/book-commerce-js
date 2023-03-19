import { Request, Response } from "express";
import { AccountViewModel } from "../bookcommerce.infrastructure/DTO/AccountViewModel";
import { BaseResponse } from "../bookcommerce.infrastructure/DTO/Responses/BaseResponse";
import { TokenResponse } from "../bookcommerce.infrastructure/DTO/Responses/TokenResponse";
import { AccountService } from "../bookcommerce.service/AccountService";

export class AccountController
{
  public accountService?: AccountService
  constructor(accountService: AccountService)
  {
    this.accountService = accountService
  }

  //POST auth/register/customer
  public async RegisterCustomer(req: Request, res: Response) : Promise<Response>
  {
    const { username, email, password, confirmPassword } = req.body
    const accountViewModel = new AccountViewModel({
      Username: username,
      Email: email,
      Password: password
    })
    const result = await this.accountService?.RegisterCustomer(accountViewModel)
    if (!result?.status)
    {
      return res.status(400).json(new BaseResponse({
        status: result?.status,
        message: result?.message
      }))
    }
    return res.status(200).json(new BaseResponse({
      status: result?.status,
      message: result?.message
    }))
  } 

  //POST /auth/register/vendor
  public async registerVendor(req: Request, res: Response) : Promise<Response>
  {
    const { username, email, password, confirmPassword } = req.body
    const accountViewModel = new AccountViewModel({
      Username: username,
      Email: email,
      Password: password
    })
    const result = await this.accountService?.RegisterVendor(accountViewModel)
    if (!result?.status)
    {
      return res.status(400).json(new BaseResponse({
        status: result?.status,
        message: result?.message
      }))
    }
    return res.status(200).json(new BaseResponse({
      status: result?.status,
      message: result?.message
    }))
  }

  //POST /auth/login
  public async Login(req: Request, res: Response): Promise<Response>
  {
    
    const { email, password } = req.body
    console.log(email)
    const accountViewModel = new AccountViewModel({
      Email: email,
      Password: password
    })
    const result = await this.accountService?.Login(accountViewModel)
    if (!result!.status)
    {
      return res.status(401).json(new TokenResponse({
        status: result?.status,
        message: result?.message,
        accessToken: "",
        refreshToken: ""
      }))
    }
    return res.status(200).json(new TokenResponse({
      status: result?.status,
      message: result?.message,
      accessToken: result?.accessToken,
      refreshToken: result?.refreshToken
    }))
  }

  //GET /active
  public verifyUserAtFirstLogin(req: Request, res: Response) : Response
  {
    const accountViewModel = new AccountViewModel({
      Email: req.query.email as string
    })
    console.log(req.query.email)
    const result = this.accountService!.VerifyAtFirstLogin(accountViewModel)
    if (!result.status)
    {
      return res.status(404).json(new BaseResponse({
        status: result.status,
        message: result.message
      }))
    }
    return res.status(200).json(new BaseResponse({
      status: result.status,
      message: result.message
    }))
  }

  //POST /forgot-password
  

  //POST /refresh-token
  public async RefreshToken(req: Request, res: Response) : Promise<Response> {
    const token = req.headers["refresh-token"]
    const result = await this.accountService?.RefreshToken(token as string)
    return res.json(result)
  }

  //POST /sign-out
  public async SignOut(req: Request, res: Response) : Promise<Response> {
    const token = req.headers["refresh-token"]
    const result = await this.accountService?.SignOut(token as string)
    return res.json(result)
  }
}