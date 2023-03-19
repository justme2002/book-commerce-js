import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { ProductVariant } from './ProductVariant'
import { Order } from './Order'

@Entity()
export class OrderDetail extends BaseEntity
{
  @PrimaryGeneratedColumn("uuid")
  public OrderDetailId?: string

  @OneToOne(() => ProductVariant)
  @JoinColumn({
    name: "product_variant_id"
  })
  public ProductVariant?: ProductVariant

  @ManyToOne(() => Order)
  public order?: Order

  @Column()
  public Quantity?: number
  
  constructor(productVariant?: ProductVariant, quantity?: number)
  {
    super()
    this.ProductVariant = productVariant
    this.Quantity = quantity
  }
}