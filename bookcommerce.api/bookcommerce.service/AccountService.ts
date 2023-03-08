import argon2 from "argon2";
import { RoleTypeConstant } from "../bookcommerce.constant/Role";
import { Account } from "../bookcommerce.infrastructure/DAL/Entities/Account";
import { RefreshToken } from "../bookcommerce.infrastructure/DAL/Entities/RefreshToken";
import { Role } from "../bookcommerce.infrastructure/DAL/Entities/Role";
import { RoleType } from "../bookcommerce.infrastructure/DAL/Entities/RoleType";
import { IAccountRepository } from "../bookcommerce.infrastructure/DAL/Interfaces/IAccountRepository";
import { IRoleRepository } from "../bookcommerce.infrastructure/DAL/Interfaces/IRoleRepository";
import { ITokenRepository } from "../bookcommerce.infrastructure/DAL/Interfaces/ITokenRepository";
import { AccountViewModel } from "../bookcommerce.infrastructure/DTO/AccountViewModel";
import { BaseResponse } from "../bookcommerce.infrastructure/DTO/Responses/BaseResponse";
import { TokenResponse } from "../bookcommerce.infrastructure/DTO/Responses/TokenResponse";
import { IAccountService, IAccountServiceDI } from "./Interfaces/IAccountService";
import { IJwtService } from "./Interfaces/IJwtService";

export class AccountService implements IAccountService
{
  private accountRepository?: IAccountRepository
  private jwtService?: IJwtService
  private tokenRepository?: ITokenRepository
  private roleRepository?: IRoleRepository
  constructor({ accountRepository, jwtService, tokenRepository, roleRepository }: IAccountServiceDI)
  {
    this.accountRepository = accountRepository
    this.jwtService = jwtService
    this.tokenRepository = tokenRepository
    this.roleRepository = roleRepository
  }
  
  private async hashPassword(password: string | undefined)
  {
    var hash = argon2.hash(password as string, { raw: false })
    return hash
  }

  public async RegisterCustomer(accountViewModel: AccountViewModel): Promise<BaseResponse> {
    try {
      var password : string | undefined = await this.hashPassword(accountViewModel.Password)
      const account = new Account(
        accountViewModel.Username,
        accountViewModel.Email,
        password,
        accountViewModel.IsActive
      )
      const result = this.accountRepository?.registerCustomer([account])
      if (!result)
      {
        return new BaseResponse({
          status: result,
          message: "failed to create account"
        })
      }

      const roleType = await this.isRoleTypeExist(RoleTypeConstant.CUSTOMER)
      if (roleType)
      {
        await this.roleRepository?.AddUserToRole(new Role(account, roleType))
      }
      await this.roleRepository?.CreateRole(new RoleType(RoleTypeConstant.CUSTOMER))
      const roleToAdd = await this.roleRepository?.GetRole(RoleTypeConstant.CUSTOMER)
      this.roleRepository?.AddUserToRole(new Role(account, roleToAdd as RoleType))
      return new BaseResponse({
        status: result,
        message: "account created"
      })
    } catch (error) {
      console.log(error)
      return new BaseResponse({
        status: false,
        message: "failed to create account"
      })
    }
  }

  RegisterVendor(accountViewModel: AccountViewModel): BaseResponse {
    throw new Error("Method not implemented.");
  }

  RegisterAdmin(accountViewModel: AccountViewModel): BaseResponse {
    throw new Error("Method not implemented.");
  }
  
  public async Login(accountViewModel: AccountViewModel): Promise<TokenResponse> {
    try {
      const result = await this.accountRepository?.login(accountViewModel) as Account
      if (!result.IsActive)
      {
        return new BaseResponse({
          status: false,
          message: "inactive account"
        })
      }
      const passwordVerification = await argon2.verify(result.Password as string, accountViewModel.Password as string) 
      if (!passwordVerification)
      {
        return new BaseResponse({
          status: false,
          message: "invalid username or password"
        })
      }   
      const accessToken = this.jwtService?.generateAccessToken({
        id: result.AccountId,
        username: result.UserName,
        email: result.Email
      }, 
      process.env.ACCESS_TOKEN as string,
      '30m'
      )
      const refreshToken = this.jwtService?.generateRefreshToken({
        id: result.AccountId,
        username: result.UserName,
        email: result.Email
      },
      process.env.REFRESH_TOKEN as string,
      '24h'
      )
      const refreshTokenStoring = new RefreshToken(refreshToken, result) 
      this.tokenRepository?.StoreRefreshTokenToDB(refreshTokenStoring)
      return new TokenResponse({
        status: true,
        message: "Login successfully",
        accessToken,
        refreshToken
      })
    } catch (error) {
      console.log(error)
      return new BaseResponse({
        status: false,
        message: "invalid username or password"
      })
    }
  }

  public VerifyAtFirstLogin(accountViewModel: AccountViewModel): BaseResponse {
    try {
      const result = this.accountRepository?.verifyAtFirstLogin(accountViewModel)
      if (!result)
      {
        return new BaseResponse({
          status: false,
          message: "failed to active user"
        })
      }
      return new BaseResponse({
        status: true,
        message: "user activated"
      })
    } catch (error) {
      console.log(error)
      return new BaseResponse({
        status: false,
        message: "failed to active user"
      })
    }
  }

  private async isRoleTypeExist(roleType: string)
  {
    let roleExistOrNot = await this.roleRepository?.CheckRole(roleType) as RoleType
    return roleExistOrNot
  }
}