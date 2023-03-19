import { BaseEntity, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Customer } from './Customer'
import { CartDetail } from './CartDetail'

@Entity()
export class Cart extends BaseEntity
{
  @PrimaryGeneratedColumn("uuid")
  public CartId?: string

  @OneToOne(() => Customer)
  @JoinColumn({
    name: "customer_id"
  })
  public Customer?: Customer

  @OneToMany(() => CartDetail, cartDetail => cartDetail.Cart)
  public CartDetails?: CartDetail[]

  constructor(customer?: Customer)
  {
    super()
    this.Customer = customer
  }
}