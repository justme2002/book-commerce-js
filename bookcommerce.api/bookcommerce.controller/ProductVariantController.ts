import { Request, response, Response } from "express";
import multer from "multer";
import { ProductVariantRequest } from "../bookcommerce.infrastructure/DTO/requests/ProductVariantRequest";
import { ProductVariantUpdateQuantityRequest } from "../bookcommerce.infrastructure/DTO/requests/ProductVariantUpdateQuantityRequest";
import { ProductVariantService } from "../bookcommerce.service/ProductVariantService";

export class ProductVariantController
{
  constructor(private readonly ProductVariantService?: ProductVariantService)
  {

  }

  // POST /product-variant/create
  public async CreateProduct(req: Request, res: Response): Promise<Response>
  {
    try {
      const { productVariantName, productVariantQuantity, productId } = req.body
      const productVariantRequest = new ProductVariantRequest(
        productVariantName,
        productVariantQuantity,
        productId,
        req.files as Express.Multer.File[] 
      )
      const result = await this.ProductVariantService?.CreateVariant(productVariantRequest)
      return res.status(200).json({
        status: result,
        message: !result ? "failed to create variant" : "create variant successfully"
      })
    } catch (error) {
      console.log(error)
      return res.status(400).json({
        status: false,
        message: "system error"
      })
    }
  }

  //GET /product-variants/:id
  public async GetProductVariantsByProductId(req: Request, res: Response): Promise<Response>
  {
    try {
      const { productId } = req.params
      const result = await this.ProductVariantService?.GetProductVariantsByProductId(String(productId))
      return res.status(200).json({
        status: true,
        message: `get all product variant depends on ${productId}`,
        result
      })
    } catch (error) {
      console.log(error)
      return res.status(404).json({
        status: false,
        message: "failed to get variants",
        result: []
      })
    }
  }

  //PUT /product-variant/update-quantity/:id
  public async UpdateVariantQuantity(req: Request, res: Response): Promise<Response>
  {
    try {
      const { quantity } = req.body
      const { productVariantId } = req.params
      const productVariantUpdateQuantityRequest: ProductVariantUpdateQuantityRequest = new ProductVariantUpdateQuantityRequest(
        productVariantId,
        quantity
      )
      const result = await this.ProductVariantService?.UpdateVariantQuantity(productVariantUpdateQuantityRequest)
      return res.status(200).json({
        status: result,
        message: !result ? "failed to update quantity" : "update quantity successfully"
      })
    } catch (error) {
      console.log(error)
      return res.status(400).json({
        status: false,
        message: "failed to update quantity"
      })
    }
  }
}