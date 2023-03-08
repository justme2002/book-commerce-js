import { PrimaryGeneratedColumn, Column, Entity, BaseEntity, OneToOne, JoinColumn } from 'typeorm'
import { Account } from './Account';

@Entity("Role")
export class Role extends BaseEntity
{
  @PrimaryGeneratedColumn("uuid")
  public RoleId?: string;

  @Column({
    type: "varchar",
    name: "RoleName"
  })
  public RoleName?: string

  @OneToOne(() => Account)
  @JoinColumn()
  public Account?: Account
  constructor(RoleName?: string)
  {
    super()
    this.RoleName = RoleName;
  }
}