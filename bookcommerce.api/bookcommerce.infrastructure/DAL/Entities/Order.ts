import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Customer } from './Customer'
import { OrderDetail } from './OrderDetail'

@Entity()
export class Order extends BaseEntity
{
  @PrimaryGeneratedColumn("uuid")
  public OrderId?: string

  @Column()
  public Message?: string

  @Column()
  public TotalPrice?: number

  @Column()
  public OrderStatus?: string

  @ManyToOne(() => Customer, customer => customer.orders)
  public Customer?: Customer

  @OneToMany(() => OrderDetail, orderDetail => orderDetail.order)
  public OrderDetails?: OrderDetail[]
  
  constructor(Message?: string, TotalPrice?: number, OrderStatus?: string, Customer?: Customer)
  {
    super()
    this.Message = Message
    this.TotalPrice = TotalPrice
    this.OrderStatus = OrderStatus
    this.Customer = Customer
  }
}