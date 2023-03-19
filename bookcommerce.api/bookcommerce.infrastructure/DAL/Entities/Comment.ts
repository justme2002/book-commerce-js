import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";

@Entity()
export class Comment extends BaseEntity {

  @PrimaryGeneratedColumn("uuid")
  public CommentId?: string

  @Column()
  public CommentBody?: string

  @ManyToOne(() => Product, (product) => product.Comments)
  public Product?: Product

  constructor(CommentBody?: string, Product?: Product) {
    super()
    this.CommentBody = CommentBody
    this.Product = Product
  }
}