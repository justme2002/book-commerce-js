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
  signOut(): boolean
  refreshToken(): string
  getAccountId(id: string) : Promise<Account>
}