import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Cart } from './Cart'
import { ProductVariant } from './ProductVariant'

@Entity()
export class CartDetail extends BaseEntity
{
  @PrimaryGeneratedColumn("uuid")
  public CartDetailId?: string

  @OneToOne(() => ProductVariant)
  @JoinColumn({
    name: "product_variant_id"
  })
  public ProductVariant?: ProductVariant

  @Column()
  public Quantity?: number

  @ManyToOne(() => Cart, cart => cart.CartDetails)
  public Cart?: Cart

  constructor(ProductVariant?: ProductVariant, Quantity?: number)
  {
    super()
    this.ProductVariant = ProductVariant
    this.Quantity = Quantity
  }
}