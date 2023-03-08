import dataSource from './DataSource/ApplicationDataSource'

export class ApplicationDbContext
{
  constructor()
  {

  }

  public async connect() : Promise<void>
  {
    try {
      await dataSource.initialize()
      console.log("application db context init-ed")
    } catch (error) {
      console.log(error)
    }
  }
}