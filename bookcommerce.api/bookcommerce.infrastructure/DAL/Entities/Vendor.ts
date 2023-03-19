import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm'
import { Account } from './Account'
import { Address } from './Address'
import { BankAccount } from './BankAccount'
import { Image } from './Image'
import { PhoneNumber } from './PhoneNumber'
import { Product } from './Product'
import { SubCategory } from './SubCategory'

@Entity("Vendor")
export class Vendor extends BaseEntity
{
  @PrimaryGeneratedColumn("uuid")
  public VendorId?: string

  @Column()
  public VendorName?: string

  @OneToOne(() => Address)
  @JoinColumn({
    name: "AddressId"
  })
  public Address?: Address

  @OneToOne(() => PhoneNumber)
  @JoinColumn({
    name: "PhoneNumberId"
  })
  public PhoneNumber?: PhoneNumber

  @OneToOne(() => Account)
  @JoinColumn({
    name: "AccountId"
  })
  public Account?: Account

  @OneToOne(() => BankAccount)
  @JoinColumn({
    name: "BankAccountId"
  })
  public BankAccount?: BankAccount

  @OneToOne(() => Image)
  @JoinColumn({
    name: "ImageId"
  })
  public Image?: Image

  @Column()
  public IsActiveToWork?: boolean

  @OneToMany(() => SubCategory, (subCategory) => subCategory.Vendor)
  public SubCategories?: SubCategory[]

  @OneToMany(() => Product, (product) => product.Vendor)
  public Products?: Product[]


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