import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SubCategory } from "./SubCategory";

@Entity("Category")
export class Category extends BaseEntity
{
  @PrimaryGeneratedColumn("uuid")
  public categoryId?: string

  @Column({
    nullable: true,
    unique: true
  })
  public categoryName?: string

  @OneToMany(() => SubCategory, (subCategory) => subCategory.Category)
  public SubCategories?: SubCategory[]

  constructor(categoryName?: string)
  {
    super()
    this.categoryName = categoryName
  }
}

