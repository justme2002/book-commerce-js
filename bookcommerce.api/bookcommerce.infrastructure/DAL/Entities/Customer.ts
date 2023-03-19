import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm'
import { Account } from './Account'
import { Address } from './Address'
import { PhoneNumber } from './PhoneNumber'
import { Image } from './Image'
import { Order } from './Order'

@Entity("Customer")
export class Customer extends BaseEntity
{
  @PrimaryGeneratedColumn("uuid")
  public CustomerId?: string

  @Column()
  public FullName?: string

  @Column()
  public Age?: number

  @OneToMany(() => Address, (address) => address.Customer, { cascade: true })
  public Addresses?: Address[]

  @OneToMany(() => PhoneNumber, (phoneNumber) => phoneNumber, { cascade: true })
  public PhoneNumbers?: PhoneNumber[]

  @OneToOne(() => Account)
  @JoinColumn({
    name: "AccountId"
  })
  public Account?: Account

  @OneToOne(() => Image)
  @JoinColumn({
    name: "ImageId",
  })
  public Image?: Image

  @OneToMany(() => Order, order => order.Customer)
  public orders?: Order[]

  constructor(Fullname?: string, Age?: number, Account?: Account, Image?: Image)
  {
    super()
    this.FullName = Fullname
    this.Age = Age
    this.Account = Account
    this.Image = Image
  }
}