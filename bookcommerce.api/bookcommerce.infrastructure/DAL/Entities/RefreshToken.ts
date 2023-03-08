import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm'
import { Account } from './Account'

@Entity("refresh_token")
export class RefreshToken extends BaseEntity
{
  @PrimaryGeneratedColumn("uuid")
  public RefreshTokenId?: string

  @Column()
  public RefreshToken?: string

  @OneToOne(() => Account)
  @JoinColumn()
  public Account?: Account

  constructor(RefreshToken?: string, Account?: Account)
  {
    super()
    this.RefreshToken = RefreshToken
    this.Account = Account
  }
}