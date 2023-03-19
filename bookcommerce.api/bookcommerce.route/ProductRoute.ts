import { Express } from "express";
import multer from "multer";
import { IDIContainer } from 'rsdi'
import { ProductController } from "../bookcommerce.controller/ProductController";
import { authMiddleware } from "../bookcommerce.middleware/AuthMiddleware";

export default function mapProductRoute(app?: Express, diContainer?: IDIContainer, uploadMiddleware?: multer.Multer)
{
  const productController = diContainer?.get(ProductController)
  app?.post("/product/create", authMiddleware, uploadMiddleware?.array("product_detail", 20)!, productController?.createProduct.bind(productController)!)
  app?.get("/products", productController?.getAllProducts.bind(productController)!)
  app?.get("/product/:id", productController?.getProductById.bind(productController)!)
}