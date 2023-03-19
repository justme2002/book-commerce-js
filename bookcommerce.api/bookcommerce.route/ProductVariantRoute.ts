import { Express } from 'express'
import multer from 'multer'
import { IDIContainer } from 'rsdi'
import { ProductVariantController } from '../bookcommerce.controller/ProductVariantController'
import { authMiddleware } from '../bookcommerce.middleware/AuthMiddleware'

export default function mapProductVariantRoute(app: Express, diContainer: IDIContainer, multerMiddleware?: multer.Multer) {
  const productVariantController = diContainer.get(ProductVariantController)
  app.post("/product-variant/create", authMiddleware, multerMiddleware?.array("product_detail", 100)!, productVariantController.CreateProduct.bind(productVariantController))
  app.get("/product-variants/:productId", productVariantController.GetProductVariantsByProductId.bind(productVariantController))
  app.put(
    "/product-variant/update-quantity/:productVariantId", 
    authMiddleware,  
    productVariantController.UpdateVariantQuantity.bind(productVariantController)
  )
}