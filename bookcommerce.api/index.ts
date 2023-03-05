import express, { Express } from 'express'
const app = express()

class StartUp
{
  public app?: Express
  constructor(app?: Express)
  {
    this.app = app;
  }
  
  public MapExpressMiddleware() : void
  {
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(express.raw())
  }

  public BindPort(port: number) : void
  {
    app.listen(port, () => console.log(`port ${port} has launched`))
  }
}

new StartUp(app).MapExpressMiddleware()
new StartUp(app).BindPort(4000)

