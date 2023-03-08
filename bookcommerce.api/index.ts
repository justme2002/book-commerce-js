import { StartUp } from "./StartUp";
import express from 'express'
import { DbFatory } from "./bookcommerce.infrastructure/DAL/DbFactory";
import { ApplicationDbContext } from "./bookcommerce.infrastructure/DAL/DbContext";
const app = express()

var dbFactory = new DbFatory(new ApplicationDbContext());
var builder = new StartUp(app, dbFactory);

const start = async () => {
  try {
    builder.CreateEnviromentVariable()
    builder.MapExpressMiddleware()
    builder.AddDataSourceContext()
    builder.MapRoute()
    builder.BindPort(4000)
  } catch (error) {
    console.log(error)
  }
}

start()