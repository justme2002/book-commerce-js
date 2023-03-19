import { Request, Response } from "express";
import { ProductVariantCreatePriceRequest } from "../bookcommerce.infrastructure/DTO/requests/ProductVariantCreatePriceRequest";
import { ProductVariantPriceService } from "../bookcommerce.service/ProductVariantPriceService";

export class ProductVariantPriceController
{
  constructor(private readonly productVariantPriceService?: ProductVariantPriceService)
  {

  }

  //POST /product-variant-price/add-price
  public async CreateProductVariantPrice(req: Request, res: Response) : Promise<Response>
  {
    try {
      const { defaultPrice, salePrice, productVariantId } = req.body
      const productVariantCreatePriceRequest = new ProductVariantCreatePriceRequest(defaultPrice, salePrice, productVariantId)
      const result = await this.productVariantPriceService?.CreateProductVariantPrice(productVariantCreatePriceRequest)
      return res.status(200).json({
        status: result,
        message: "product variant price added"
      })
    } catch (error) {
      console.log(error)
      return res.status(400).json({
        status: false,
        message: "failed to add price to product variant"
      })
    }
  }
}