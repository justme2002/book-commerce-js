import { Express } from 'express'
import { IDIContainer } from 'rsdi'
import { ProductVariantPriceController } from '../bookcommerce.controller/ProductVariantPriceController'
import { authMiddleware } from '../bookcommerce.middleware/AuthMiddleware'

export default function mapProductVariantPriceRoute(app?: Express, diContainer?: IDIContainer)
{
  const productVariantPriceController = diContainer?.get(ProductVariantPriceController)
  app?.post("/product-variant-price/add-price", authMiddleware, productVariantPriceController?.CreateProductVariantPrice.bind(productVariantPriceController)!)
}