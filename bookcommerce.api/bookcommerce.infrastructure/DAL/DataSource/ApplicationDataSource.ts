import { DataSource } from 'typeorm'
import { Account } from '../Entities/Account'
import { Address } from '../Entities/Address'
import { BankAccount } from '../Entities/BankAccount'
import { BankAccountProvider } from '../Entities/BankAccountProvider'
import { Customer } from '../Entities/Customer'
import { PhoneNumber } from '../Entities/PhoneNumber'
import { RefreshToken } from '../Entities/RefreshToken'
import { Role } from '../Entities/Role'
import { RoleType } from '../Entities/RoleType'
import { Vendor } from '../Entities/Vendor'
import { Image } from '../Entities/Image'

const dataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  username: "root",
  password: "",
  database: "BOOK_COMMERCE_JS",
  entities: [
    Account, 
    Role, 
    RefreshToken,
    RoleType,
    Customer,
    Vendor,
    Image,
    BankAccount,
    BankAccountProvider,
    Address,
    PhoneNumber
  ],
  synchronize: false,
  migrationsRun: true
})

export default dataSource