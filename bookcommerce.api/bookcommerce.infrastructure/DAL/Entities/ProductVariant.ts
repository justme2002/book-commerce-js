import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";

@Entity("Product_variant")
export class ProductVariant extends BaseEntity
{
  @PrimaryGeneratedColumn('uuid')
  public ProductVariantId?: string

  @Column()
  public ProductVariantName?: string

  @Column()
  public ProductVariantQuantity?: number

  @ManyToOne(() => Product, (product) => product.ProductVariants)
  public Product?: Product

  constructor(ProductVariantName?: string, ProductVariantQuantity?: number, Product?: Product)
  {
    super()
    this.ProductVariantName = ProductVariantName
    this.ProductVariantQuantity = ProductVariantQuantity
    this.Product = Product
  }
}