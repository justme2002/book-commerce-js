export class AccountViewModel
{
  public Username?: string
  public Email?: string
  public Password?: string
  public IsActive?: boolean
  constructor({ Username, Email, Password } : { Username?: string, Email?: string, Password?: string })
  {
    this.Username = Username;
    this.Email = Email;
    this.Password = Password;
    this.IsActive = false
  }
}