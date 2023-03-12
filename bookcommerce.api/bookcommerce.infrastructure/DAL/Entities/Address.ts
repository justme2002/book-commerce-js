import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, Unique, ManyToOne } from 'typeorm'
import { Customer } from './Customer'

@Entity("Address")
export class Address extends BaseEntity
{
  @PrimaryGeneratedColumn("uuid")
  public AddressId?: string

  @Column()
  public HomeNumber?: number

  @Column()
  public StreetName?: string

  @Column()
  public Ward?: string

  @Column()
  public DistrictOrCity?: string

  @Column()
  public CityOrProvince?: string

  @Column()
  public Country?: string

  @ManyToOne(() => Customer, (customer) => customer.Addresses, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  public Customer?: Customer

  constructor(HomeNumber?: number, StreetName?: string, Ward?: string, DistrictOrCity?: string, CityOrProvince?: string, Country?: string)
  {
    super()
    this.HomeNumber = HomeNumber
    this.StreetName = StreetName
    this.Ward = Ward
    this.DistrictOrCity = DistrictOrCity
    this.CityOrProvince = CityOrProvince
    this.Country = Country
  }
}