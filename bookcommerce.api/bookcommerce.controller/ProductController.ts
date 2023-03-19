import { Request, Response } from "express";
import { ProductRequest } from "../bookcommerce.infrastructure/DTO/requests/ProductRequest";
import { BaseResponse } from "../bookcommerce.infrastructure/DTO/Responses/BaseResponse";
import { ProductResponse } from "../bookcommerce.infrastructure/DTO/Responses/ProductResponse";
import { ProductService } from "../bookcommerce.service/ProductService";

export class ProductController
{
  constructor(private readonly productService?: ProductService)
  {

  }

  //POST /product/create
  public async createProduct(req: Request, res: Response) : Promise<Response>
  {
    const { productName, productDescription, author } = req.body
    const { subCategoryId } = req.query
    const productRequest = new ProductRequest(productName, productDescription, author, req.files as Express.Multer.File[])
    const result = await this.productService?.createProduct(
      productRequest,
      String(subCategoryId),
      String(req.id)
    )
    if (!result) {
      return res.status(400).json(new BaseResponse({
        status: false,
        message: "failed to create product"
      }))
    }
    return res.status(200).json(new BaseResponse({
      status: true,
      message: "create product successfully"
    }))
  }

  //GET /products
  public async getAllProducts(req: Request, res: Response) : Promise<Response>
  {
    try {
      const result = await this.productService?.getAllProducts()
      return res.status(200).json(new ProductResponse({
        status: true,
        message: "get all products out",
        products: result
      }))
    } catch (error) {
      console.log(error)
      return res.status(404).json(new ProductResponse({
        status: false,
        message: "failed to get product out",
        products: []
      }))
    }
  }

  //GET /product/:id
  public async getProductById(req: Request, res: Response) : Promise<Response>
  {
    try {
      const { id } = req.params
      const result = await this.productService?.getProductById(String(id))
      return res.status(200).json({
        status: true,
        message: `get product by id: ${id}`,
        result
      })
    } catch (error) {
      console.log(error)
      return res.status(400).json({
        status: false,
        message: `fail to get product`,
        result: {}
      })
    }
  }
}