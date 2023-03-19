import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./Category";
import { Product } from "./Product";
import { Vendor } from "./Vendor";

@Entity("Sub_Category")
export class SubCategory extends BaseEntity
{
  @PrimaryGeneratedColumn("uuid")
  public SubCategoryId?: string

  @Column()
  public SubCategoryName?: string  

  @ManyToOne(() => Category, (category) => category.SubCategories)
  public Category?: Category

  @ManyToOne(() => Vendor, (vendor) => vendor.SubCategories)
  public Vendor?: Vendor

  @OneToMany(() => Product, (product) => product.SubCategory)
  public Products?: Product[]

  constructor(SubCategoryName?: string, Category?: Category, Vendor?: Vendor) {
    super()
    this.SubCategoryName = SubCategoryName
    this.Category = Category
    this.Vendor = Vendor
  }
}