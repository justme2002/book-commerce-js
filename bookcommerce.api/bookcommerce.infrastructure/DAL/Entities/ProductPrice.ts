import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";

@Entity("ProductPrice")
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

  @OneToOne(() => Product)
  @JoinColumn()
  public Product?: Product

  constructor(ProductDefaultPrice?: number, ProductSalePrice?: number, Product?: Product)
  {
    super()
    this.ProductDefaultPrice = ProductDefaultPrice
    this.ProductSalePrice = ProductSalePrice
    this.Product = Product
  }
}