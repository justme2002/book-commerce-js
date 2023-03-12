import { Entity, ObjectLiteral } from "typeorm";
import { AccountViewModel } from "../../DTO/AccountViewModel";
import { BaseRepository } from "../BaseRepository";
import { Account } from "../Entities/Account";
import { RefreshToken } from "../Entities/RefreshToken";
import { IAccountRepository } from "../Interfaces/IAccountRepository";

export class AccountRepository extends BaseRepository implements IAccountRepository
{
  constructor()
  {
    super()
  }

  public registerCustomer(account: Account[]): boolean {
    if (account == null)
    {
      return false
    }
    this.GetRepository(Account)
    this.Add<Account>(account)
    return true
  }

  public registerVendor(account: Account[]): boolean {
    if (!account)
    {
      return false
    }
    this.GetRepository(Account)
    this.Add<Account>(account)
    return true
  }

  public registerAdmin(account: Account[]): boolean {
    if (!account)
    {
      return false
    }
    this.Add<Account>(account)
    return true
  }

  public async login(accountViewModel: AccountViewModel) : Promise<ObjectLiteral| null | undefined> {
    if (accountViewModel == null)
    {
      return undefined
    }
    this.GetRepository(Account)
    const result = await this.GetOneBy({
      Email: accountViewModel.Email
    })
    return result
  }

  public async verifyAtFirstLogin(accountViewModel: AccountViewModel): Promise<boolean> {
    this.GetRepository(Account)
    const ExistAccount : ObjectLiteral | null | undefined = await this.GetOneBy({
      Email: accountViewModel.Email
    })
    console.log(ExistAccount)
    const CastExistAccount = ExistAccount as Account
    CastExistAccount.IsActive = true
    const result = this.Update([CastExistAccount])
    return result
  }
  public resetPassword(gmail: string): boolean {
    throw new Error("Method not implemented.");
  }
  public signOut(): boolean {
    throw new Error("Method not implemented.");
  }
  public refreshToken(): string {
    throw new Error("Method not implemented.");
  }

  public storeTokenToDb(refreshToken: RefreshToken)
  {
    this.GetRepository(RefreshToken)
    this.Add([refreshToken])
  }

  public async getAccountId(id: string) : Promise<Account>
  {
    this.GetRepository(Account)
    const result = await this.GetOneBy({
      AccountId: id
    })
    return result as Account
  }
}
