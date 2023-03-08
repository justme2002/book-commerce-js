import { table } from 'console';
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm'

@Entity("Account")
export class Account extends BaseEntity
{
  @PrimaryGeneratedColumn("uuid")
  public AccountId?: string

  @Column({
    type: "varchar",
    length: 255,
    nullable: false,
    unique: true
  })
  public UserName?: string

  @Column("varchar")
  public Email?: string

  @Column("varchar")
  public Password?: string

  @Column("bool")
  public IsActive?: boolean

  constructor(UserName?: string, Email?: string, Password?: string, IsActive?: boolean)
  {
    super()
    this.UserName = UserName
    this.Email = Email
    this.Password = Password
    this.IsActive = IsActive
  }
}