import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";

@Entity("Product_rate")
export class ProductRate extends BaseEntity
{
  @PrimaryGeneratedColumn("uuid")
  public ProductRateId?: string

  @Column()
  public RateCount?: number

  @ManyToOne(() => Product, (product) => product.ProductRates)
  public Product?: Product

  constructor(RateCount?: number, Product?: Product)
  {
    super()
    this.RateCount = RateCount
    this.Product = Product
  }
}