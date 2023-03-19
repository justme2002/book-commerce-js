import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class PaymentMethod extends BaseEntity
{
  @PrimaryGeneratedColumn("uuid")
  public PaymentMethodId?: string

  @Column()
  public PaymentMethod?: string

  constructor(PaymentMethod?: string)
  {
    super()
    this.PaymentMethod = PaymentMethod
  }
}