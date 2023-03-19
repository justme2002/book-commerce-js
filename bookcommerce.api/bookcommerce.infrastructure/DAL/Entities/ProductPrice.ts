import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";
import { ProductVariant } from "./ProductVariant";

@Entity("Product_price")
export class ProductPrice extends BaseEntity
{
  @PrimaryGeneratedColumn("uuid")
  public ProductPriceId?: string

  @Column()
  public ProductDefaultPrice?: number

  @Column()
  public ProductSalePrice?: number

  @Column()
  public DefaultPriceDate?: Date

  @Column()
  public SalePriceDate?: Date

  @OneToOne(() => ProductVariant)
  @JoinColumn({
    name: "ProductVariantId"
  })
  public ProductVariant?: ProductVariant

  constructor(ProductDefaultPrice?: number, ProductSalePrice?: number, ProductVariant?: ProductVariant, DefaultPriceDate?: Date, SalePriceDate?: Date)
  {
    super()
    this.ProductDefaultPrice = ProductDefaultPrice
    this.ProductSalePrice = ProductSalePrice
    this.ProductVariant = ProductVariant
    this.DefaultPriceDate = DefaultPriceDate
    this.SalePriceDate = SalePriceDate
  }
}