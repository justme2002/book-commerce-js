import { DataSource } from 'typeorm'
import { Account } from '../Entities/Account'
import { RefreshToken } from '../Entities/RefreshToken'
import { Role } from '../Entities/Role'

const dataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  username: "root",
  password: "",
  database: "BOOK_COMMERCE_JS",
  entities: [Account, Role, RefreshToken],
  synchronize: true,
  migrationsRun: true
})

export default dataSource