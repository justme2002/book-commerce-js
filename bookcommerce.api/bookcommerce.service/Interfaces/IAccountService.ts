import { IAccountRepository } from "../../bookcommerce.infrastructure/DAL/Interfaces/IAccountRepository";
import { IRoleRepository } from "../../bookcommerce.infrastructure/DAL/Interfaces/IRoleRepository";
import { ITokenRepository } from "../../bookcommerce.infrastructure/DAL/Interfaces/ITokenRepository";
import { AccountViewModel } from "../../bookcommerce.infrastructure/DTO/AccountViewModel";
import { BaseResponse } from "../../bookcommerce.infrastructure/DTO/Responses/BaseResponse";
import { TokenResponse } from "../../bookcommerce.infrastructure/DTO/Responses/TokenResponse";
import { IJwtService } from "./IJwtService";

export interface IAccountService
{
  RegisterCustomer(accountViewModel: AccountViewModel): Promise<BaseResponse>
  RegisterVendor(accountViewModel: AccountViewModel): Promise<BaseResponse>
  RegisterAdmin(accountViewModel: AccountViewModel): BaseResponse
  Login(accountViewModel: AccountViewModel): Promise<TokenResponse>
  VerifyAtFirstLogin(accountViewModel: AccountViewModel): BaseResponse
}
