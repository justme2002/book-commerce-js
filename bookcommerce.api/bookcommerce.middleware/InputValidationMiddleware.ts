import { NextFunction, Request, Response } from "express";
import { BaseResponse } from "../bookcommerce.infrastructure/DTO/Responses/BaseResponse";

export const validateRegisterInput = (req: Request, res: Response, next: NextFunction) => {
  const { username, email, password, confirmPassword } = req.body
  try {
    if (username == null || email == null || password == null)
    return res.status(400).json(new BaseResponse({
      status: false,
      message: "please reinput your information"
    }))
    if (password < 8)
    {
      return res.status(400).json(new BaseResponse({
        status: false,
        message: "password length does not meet the requirement"
      }))
    }
    if (password !== confirmPassword)
    {
      return res.status(400).json(new BaseResponse({
        status: false,
        message: "not the same password"
      }))
    }
    else next()
  } catch (error) {
    return res.status(400).json(new BaseResponse({
      status: false,
      message: "somethings went wrong, pls try again"
    }))
  }
}