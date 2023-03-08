import express, { Application } from 'express'
import { AccountController } from '../bookcommerce.controller/AccountController'
import { AccountRepository } from '../bookcommerce.infrastructure/DAL/Repositories/AccountRepository'
import { AccountService } from '../bookcommerce.service/AccountService'
import { validateRegisterInput } from '../bookcommerce.middleware/InputValidationMiddleware'
import { JwtService } from '../bookcommerce.service/JwtService'
import { TokenRepository } from '../bookcommerce.infrastructure/DAL/Repositories/TokenRepository'
export const AuthRouter = express.Router()

//DI
const accountController = new AccountController(
  new AccountService(
    {
      accountRepository: new AccountRepository(),
      jwtService: new JwtService(),
      tokenRepository: new TokenRepository()
    }
  )
)
AuthRouter.post("/auth/register/customer", validateRegisterInput, accountController.RegisterCustomer as Application)
AuthRouter.post("/auth/login/customer", accountController.Login as Application)
AuthRouter.get("/active", accountController.verifyUserAtFirstLogin as Application)
