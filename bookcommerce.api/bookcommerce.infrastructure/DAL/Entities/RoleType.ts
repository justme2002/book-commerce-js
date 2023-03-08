import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm' 
import { Role } from './Role'

@Entity()
export class RoleType extends BaseEntity
{
  @PrimaryGeneratedColumn("uuid")
  public RoleTypeId?: string

  @Column({
    unique: true
  })
  public RoleType?: string
  @OneToMany(() => Role, (role) => role.RoleType, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  })
  public Roles?: []

  constructor(RoleType: string)
  {
    super()
    this.RoleType = RoleType
  }
}