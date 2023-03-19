import { PrimaryGeneratedColumn, Column, Entity, BaseEntity, OneToOne, JoinColumn, ManyToOne } from 'typeorm'
import { Account } from './Account';
import { RoleType } from './RoleType';

@Entity("Role")
export class Role extends BaseEntity
{
  @PrimaryGeneratedColumn("uuid")
  public RoleId?: string;

  @OneToOne(() => Account)
  @JoinColumn({
    name: "AccountId"
  })
  public Account?: Account

  @ManyToOne(() => RoleType, (roleType) => roleType.Roles, { 
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  public RoleType?: RoleType

  constructor(Account: Account, RoleType: RoleType)
  {
    super()
    this.Account = Account
    this.RoleType = RoleType
  }
}