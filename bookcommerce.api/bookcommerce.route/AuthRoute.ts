import { Express } from "express";
import { IDIContainer } from 'rsdi'
import { AccountController } from "../bookcommerce.controller/AccountController";
import { validateRegisterInput } from "../bookcommerce.middleware/InputValidationMiddleware";

export default function mapAuthRoute (app?: Express, diContainer?: IDIContainer)
{
  const accountController = diContainer?.get(AccountController)
  app?.post("/auth/login", accountController!.Login.bind(accountController))
  app?.post("/auth/register/customer", validateRegisterInput, accountController!.RegisterCustomer.bind(accountController))
  app?.post("/auth/register/vendor", validateRegisterInput, accountController!.registerVendor.bind(accountController))
  app?.route("/active").get(accountController!.verifyUserAtFirstLogin.bind(accountController))
}
