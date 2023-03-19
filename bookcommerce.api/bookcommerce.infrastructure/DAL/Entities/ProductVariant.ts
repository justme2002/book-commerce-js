import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";

@Entity("ProductVariant")
export class ProductVariant extends BaseEntity
{
  @PrimaryGeneratedColumn('uuid')
  public ProductVariantId?: string

  @Column()
  public ProductVariantName?: string

  @ManyToOne(() => Product, (product) => product.ProductVariants)
  public Product?: Product


}