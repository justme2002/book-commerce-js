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
import { Category } from '../Entities/Category'
import { SubCategory } from '../Entities/SubCategory'
import { Product } from '../Entities/Product'
import { ProductVariant } from '../Entities/ProductVariant'
import { ProductRate } from '../Entities/ProductRate'
import { ProductPrice } from '../Entities/ProductPrice'
import { Comment } from '../Entities/Comment'
import { Cart } from '../Entities/Cart'
import { CartDetail } from '../Entities/CartDetail'
import { OrderDetail } from '../Entities/OrderDetail'
import { Order } from '../Entities/Order'
import { PaymentMethod } from '../Entities/PaymentMethod'

const dataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  username: "root",
  password: "",
  database: "BOOK_COMMERCE",
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
    PhoneNumber,
    Category,
    SubCategory,
    Product,
    ProductVariant,
    ProductRate,
    ProductPrice,
    Comment,
    Cart,
    CartDetail,
    OrderDetail,
    Order,
    PaymentMethod
  ],
  synchronize: false,
  migrationsRun: true,
})

export default dataSource