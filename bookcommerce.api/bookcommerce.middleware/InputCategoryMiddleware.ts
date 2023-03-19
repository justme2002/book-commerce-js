import { NextFunction, Request, Response } from "express";

export const inputCategoryMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { categoryName } = req.body
    if (!categoryName) return res.status(400).json({
      status: false,
      message: "category name is null"
    })
  } catch (error) {
    console.log(error)
    return res.status(404).json({
      status: false,
      message: "system error"
    })
  }
}