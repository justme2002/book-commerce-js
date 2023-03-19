import { Request, Response } from "express";
import { CategoryRequest } from "../bookcommerce.infrastructure/DTO/requests/CategoryRequest";
import { BaseResponse } from "../bookcommerce.infrastructure/DTO/Responses/BaseResponse";
import { CategoriesResponse } from "../bookcommerce.infrastructure/DTO/Responses/CategoriesResponse";
import { CategoryService } from "../bookcommerce.service/CategoryService";

export class CategoryController
{
  constructor(private readonly categoryService?: CategoryService)
  {

  }

  //POST /category/create
  public async CreateCategory(req: Request, res: Response): Promise<Response>
  {
    const { categoryName } = req.body
    const categoryRequest = new CategoryRequest(categoryName)
    const result = await this.categoryService?.createCategory(categoryRequest)
    if (!result)
    {
      return res.status(400).json(new BaseResponse({
        status: false,
        message: "failed to create category, check your input and try again"
      }))
    }
    return res.status(200).json(new BaseResponse({
      status: true,
      message: "create category successfully"
    }))
  }

  //GET /categories
  public async getAllCategories(req: Request, res: Response) : Promise<Response>
  {
    const result = await this.categoryService?.getAllCategories()
    return res.status(200).json(new CategoriesResponse({
      status: true,
      message: "got all categories",
      categories: result
    }))
  }
}