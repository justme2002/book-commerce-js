import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JwtService } from "../bookcommerce.service/JwtService";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { verifyToken } = new JwtService()
  const authHeader = req.header("Authorization")
  const token = authHeader?.split(' ')[1] as string
  try {
    const decodedToken = verifyToken(token, process.env.ACCESS_TOKEN as jwt.Secret)
    if (!decodedToken)
    {
      return res.status(404).json({
        status: false,
        message: "token invalid"
      })
    }
    req.id = decodedToken.id
    req.gmail = decodedToken.gmail
    next()
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      status: false,
      message: "system error"
    })
  }
}
