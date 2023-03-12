import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm'
import { Account } from './Account'
import { Address } from './Address'
import { BankAccount } from './BankAccount'
import { Image } from './Image'
import { PhoneNumber } from './PhoneNumber'

@Entity("Vendor")
export class Vendor extends BaseEntity
{
  @PrimaryGeneratedColumn("uuid")
  public VendorId?: string

  @Column()
  public VendorName?: string

  @OneToOne(() => Address)
  @JoinColumn()
  public Address?: Address

  @OneToOne(() => PhoneNumber)
  @JoinColumn()
  public PhoneNumber?: PhoneNumber

  @OneToOne(() => Account)
  @JoinColumn()
  public Account?: Account

  @OneToOne(() => BankAccount)
  @JoinColumn()
  public BankAccount?: BankAccount

  @OneToOne(() => Image)
  public Image?: Image

  @Column()
  public IsActiveToWork?: boolean

  constructor(VendorName?: string, Account?: Account, Address?: Address, PhoneNumber?: PhoneNumber, BankAccount?: BankAccount, Image?: Image)
  {
    super()
    this.VendorName = VendorName
    this.Address = Address
    this.PhoneNumber = PhoneNumber
    this.Account = Account
    this.BankAccount = BankAccount
    this.Image = Image
    this.IsActiveToWork = true
  }
}