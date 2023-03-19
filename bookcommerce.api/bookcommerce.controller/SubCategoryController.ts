import { Request, Response } from "express";
import { SubCategoryRequest } from "../bookcommerce.infrastructure/DTO/requests/SubCategoryRequest";
import { BaseResponse } from "../bookcommerce.infrastructure/DTO/Responses/BaseResponse";
import { SubCategoryService } from "../bookcommerce.service/SubCategoryService";

export class SubCategoryController
{
  constructor(private readonly subCategoryService?: SubCategoryService)
  {

  }

  //POST /sub-category/create  
  public async createSubCategory (req: Request, res: Response)
  {
    const { subCategoryName } = req.body
    const { categoryId } = req.query
    const subCategoryRequest = new SubCategoryRequest(subCategoryName)
    const result = await this.subCategoryService?.createSubCategory(
      subCategoryRequest,
      categoryId as string,
      String(req.id)
    )
    if (!result)
    {
      return res.status(400).json(new BaseResponse({
        status: false,
        message: "failed to sub category, please try again"
      }))
    }
    return res.status(200).json(new BaseResponse({
      status: true,
      message: "create sub category successfully"
    }))
  }
}