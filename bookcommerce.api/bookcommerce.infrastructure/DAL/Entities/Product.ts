import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Comment } from "./Comment";
import { Image } from "./Image";
import { ProductRate } from "./ProductRate";
import { ProductVariant } from "./ProductVariant";
import { SubCategory } from "./SubCategory";
import { Vendor } from "./Vendor";

@Entity("Product")
export class Product extends BaseEntity
{

  @PrimaryGeneratedColumn("uuid")
  public ProductId?: string

  @Column()
  public ProductName?: string

  @Column()
  public ProductDescription?: string

  @Column()
  public Author?: string

  @Column({
    default: 0
  })
  public ProductSold?: number

  @OneToMany(() => ProductRate, (productRate) => productRate.Product)
  public ProductRates?: ProductRate[]

  @ManyToOne(() => SubCategory, (subCategory) => subCategory.Products)
  public SubCategory?: SubCategory

  @Column()
  public IsActive?: boolean

  @ManyToOne(() => Vendor, (vendor) => vendor.Products)
  public Vendor?: Vendor

  @OneToMany(() => ProductVariant, (productVariant) => productVariant.Product)
  public ProductVariants?: ProductVariant[]
  
  @OneToMany(() => Image, (image) => image.Product)
  public Images?: Image[]

  @OneToMany(() => Comment, (comment) => comment.Product)
  public Comments?: Comment[]

  constructor(ProductName?: string, ProductDescription?: string, Author?: string, SubCategory?: SubCategory, Vendor?: Vendor)
  {
    super()
    this.ProductName = ProductName
    this.ProductDescription = ProductDescription
    this.Author = Author
    this.SubCategory = SubCategory
    this.IsActive = true
    this.SubCategory = SubCategory
    this.Vendor = Vendor
  }
}