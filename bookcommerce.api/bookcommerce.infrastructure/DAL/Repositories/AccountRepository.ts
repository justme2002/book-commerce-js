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

  public async signOut(refreshToken?: string): Promise<boolean> {
    this.GetRepository(RefreshToken)
    const tokenToDeactive: RefreshToken = await this.GetOneBy({
      RefreshToken: refreshToken
    }) as RefreshToken
    if (!tokenToDeactive) return false
    tokenToDeactive.isAlive = false
    const result = await this.UpdateAsync([tokenToDeactive])
    return result
  }

  public async refreshToken(refreshToken: string, newRefreshToken: string): Promise<boolean> {
    this.GetRepository(RefreshToken)
    const tokenToRefresh = await this.GetOneBy({
      RefreshToken: refreshToken
    })
    const castTokenToRefresh = tokenToRefresh as RefreshToken
    castTokenToRefresh.RefreshToken = newRefreshToken
    castTokenToRefresh.isAlive = true
    const result = await this.AddAsync([castTokenToRefresh])
    return result
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
