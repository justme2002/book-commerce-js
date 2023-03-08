import dataSource from "./DataSource/ApplicationDataSource";
import { DataSource } from "typeorm";
import { ApplicationDbContext } from "./DbContext";

export class DbFatory
{
  public DbSet?: DataSource
  constructor(public applicationDbContext?: ApplicationDbContext)
  {
    this.DbSet = dataSource
  }
}