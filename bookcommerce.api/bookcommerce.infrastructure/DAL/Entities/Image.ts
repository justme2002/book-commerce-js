import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany, ManyToOne } from 'typeorm'
import { Product } from './Product'

@Entity("Image")
export class Image extends BaseEntity
{
  @PrimaryGeneratedColumn("uuid")
  public ImageId?: string

  @Column()
  public ImageUrl?: string

  //products
  @ManyToOne(() => Product, (product) => product.Images)
  public Product?: Product 

  //product variants
  constructor(ImageUrl: string, Product: Product)
  {
    super()
    this.ImageUrl = ImageUrl
    this.Product = Product
  }
}