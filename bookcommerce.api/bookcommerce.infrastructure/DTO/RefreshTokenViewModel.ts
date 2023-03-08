export class RefreshTokenViewModel
{
  public RefreshToken?: string
  public AccountId?: string;
  constructor({ RefreshToken, AccountId }: { RefreshToken?: string, AccountId?: string })
  {
    this.RefreshToken = RefreshToken;
    this.AccountId = AccountId;
  }
}