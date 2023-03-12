import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm'

@Entity("Image")
export class Image extends BaseEntity
{
  @PrimaryGeneratedColumn("uuid")
  public ImageId?: string

  @Column()
  public ImageUrl?: string

  //products

  //product variants
  constructor(ImageUrl: string)
  {
    super()
    this.ImageUrl = ImageUrl
  }
}