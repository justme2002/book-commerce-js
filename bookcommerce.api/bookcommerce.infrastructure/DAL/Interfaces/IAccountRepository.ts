import { ObjectLiteral } from "typeorm";
import { AccountViewModel } from "../../DTO/AccountViewModel";
import { Account } from "../Entities/Account";

export interface IAccountRepository
{
  registerCustomer(account: Account[]): boolean
  registerVendor(account: Account[]): boolean
  registerAdmin(account: Account[]): boolean
  login(accountViewModel: AccountViewModel) : Promise<ObjectLiteral| null | undefined>
  verifyAtFirstLogin(accountViewModel: AccountViewModel): Promise<boolean>
  resetPassword(gmail: string): boolean
  signOut(refreshToken?: string): Promise<boolean>
  refreshToken(refreshToken: string, newRefreshToken: string): Promise<boolean>
  getAccountId(id: string) : Promise<Account>
}