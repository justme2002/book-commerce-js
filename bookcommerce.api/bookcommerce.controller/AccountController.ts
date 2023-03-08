import { Request, Response } from "express";
import { AccountRepository } from "../bookcommerce.infrastructure/DAL/Repositories/AccountRepository";
import { RoleRepository } from "../bookcommerce.infrastructure/DAL/Repositories/RoleRepository";
import { TokenRepository } from "../bookcommerce.infrastructure/DAL/Repositories/TokenRepository";
import { AccountViewModel } from "../bookcommerce.infrastructure/DTO/AccountViewModel";
import { BaseResponse } from "../bookcommerce.infrastructure/DTO/Responses/BaseResponse";
import { TokenResponse } from "../bookcommerce.infrastructure/DTO/Responses/TokenResponse";
import { AccountService } from "../bookcommerce.service/AccountService";
import { IAccountService } from "../bookcommerce.service/Interfaces/IAccountService";
import { JwtService } from "../bookcommerce.service/JwtService";

export class AccountController
{
  public accountService?: IAccountService
  constructor(accountService: IAccountService)
  {
    this.accountService = new AccountService(
      {
        accountRepository: new AccountRepository(),
        jwtService: new JwtService(),
        tokenRepository: new TokenRepository()
      }
    )
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
    const result = await new AccountService(
      {
        accountRepository: new AccountRepository(),
        jwtService: new JwtService(),
        tokenRepository: new TokenRepository(),
        roleRepository: new RoleRepository()
      }
    ).RegisterCustomer(accountViewModel)
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
    const result = await new AccountService(
      {
        accountRepository: new AccountRepository(),
        jwtService: new JwtService(),
        tokenRepository: new TokenRepository()
      }
    ).Login(accountViewModel)
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
    const result = new AccountService({
      accountRepository: new AccountRepository(),
      jwtService: new JwtService(),
      tokenRepository: new TokenRepository()
    }).VerifyAtFirstLogin(accountViewModel)
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
}