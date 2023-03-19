import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity("Bank_account_provider")
export class BankAccountProvider extends BaseEntity
{
  @PrimaryGeneratedColumn("uuid")
  public BankAccountProviderId?: string

  @Column()
  public BankAccountProviderName?: string

  @Column()
  public BankAccountProviderShortName?: string

  constructor(BankAccountProviderName?: string, BankAccountProviderShortName?: string)
  {
    super();
    this.BankAccountProviderName = BankAccountProviderName
    this.BankAccountProviderShortName = BankAccountProviderShortName
  }
}