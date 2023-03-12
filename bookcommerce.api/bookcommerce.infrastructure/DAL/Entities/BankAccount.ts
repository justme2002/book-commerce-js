import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { BankAccountProvider } from './BankAccountProvider'

@Entity()
export class BankAccount extends BaseEntity
{
  @PrimaryGeneratedColumn("uuid")
  public BankAccountId?: string

  @Column()
  public BankAccountName?: string

  @Column()
  public BankAccountCode?: string

  @Column()
  public CreatedMonth?: number

  @Column()
  public CreatedYear?: number

  @OneToOne(() => BankAccountProvider)
  @JoinColumn()
  public BankAccountProvider?: BankAccountProvider

  constructor(BankAccountName?: string, BankAccountCode?: string, CreatedMonth?: number, CreatedYear?: number, BankAccountProvider?: BankAccountProvider)
  {
    super();
    this.BankAccountName = BankAccountName
    this.BankAccountCode = BankAccountCode
    this.CreatedMonth = CreatedMonth
    this.CreatedYear = CreatedYear
    this.BankAccountProvider = BankAccountProvider
  }
}