import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Customer } from './Customer'

@Entity("PhoneNumber")
export class PhoneNumber extends BaseEntity
{
  @PrimaryGeneratedColumn("uuid")
  public PhoneNumberId?: string

  @Column({
    unique: true
  })
  public PhoneNumber?: string

  @ManyToOne(() => Customer, (customer) => customer.PhoneNumbers)
  public Customer?: Customer

  constructor(PhoneNumber: string, Customer: Customer)
  {
    super()
    this.PhoneNumber = PhoneNumber
    this.Customer = Customer
  }
}