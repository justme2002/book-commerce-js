import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from 'typeorm'
import { RefreshToken } from './RefreshToken'

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

  @Column("varchar", {
    unique: true
  })
  public Email?: string

  @Column("varchar")
  public Password?: string

  @Column("bool")
  public IsActive?: boolean

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.Account)
  public refreshTokens?: RefreshToken[]

  constructor(UserName?: string, Email?: string, Password?: string)
  {
    super()
    this.UserName = UserName
    this.Email = Email
    this.Password = Password
    this.IsActive = false
  }
}