import { StartUp } from "./StartUp";
import express from 'express'
import { DbFatory } from "./bookcommerce.infrastructure/DAL/DbFactory";
import { ApplicationDbContext } from "./bookcommerce.infrastructure/DAL/DbContext";
import DIContainer from 'rsdi'
const app = express()

var dbFactory = new DbFatory(new ApplicationDbContext());
var builder = new StartUp(
  app, 
  dbFactory,
  new DIContainer()
);

const start = async () => {
  try {
    builder.CreateEnviromentVariable()
    builder.MapExpressMiddleware()
    builder.AddDataSourceContext()
    builder.MapRoute()
    builder.BindPort(Number(process.env.LOCAL_PORT))
  } catch (error) {
    console.log(error)
  }
}

start()