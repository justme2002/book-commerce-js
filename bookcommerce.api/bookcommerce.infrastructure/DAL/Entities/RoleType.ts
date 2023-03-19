import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm' 
import { Role } from './Role'

@Entity("Role_type")
export class RoleType extends BaseEntity
{
  @PrimaryGeneratedColumn("uuid")
  public RoleTypeId?: string

  @Column({
    unique: true
  })
  public RoleType?: string
  @OneToMany(() => Role, (role) => role.RoleType, {
    cascade: true
  })
  public Roles?: []

  constructor(RoleType: string)
  {
    super()
    this.RoleType = RoleType
  }
}