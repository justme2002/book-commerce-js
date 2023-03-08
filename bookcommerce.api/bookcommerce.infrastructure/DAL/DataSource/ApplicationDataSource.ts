import { DataSource } from 'typeorm'
import { Account } from '../Entities/Account'
import { RefreshToken } from '../Entities/RefreshToken'
import { Role } from '../Entities/Role'
import { RoleType } from '../Entities/RoleType'

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
    RoleType
  ],
  synchronize: false,
  migrationsRun: true
})

export default dataSource