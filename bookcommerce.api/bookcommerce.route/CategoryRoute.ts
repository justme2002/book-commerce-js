import { Express } from "express";
import { IDIContainer } from 'rsdi'
import { CategoryController } from "../bookcommerce.controller/CategoryController";
import { inputCategoryMiddleware } from "../bookcommerce.middleware/InputCategoryMiddleware";

export default function MapCategoryRoute(app: Express, diContainer: IDIContainer)
{
  const categoryController = diContainer.get(CategoryController)
  app.post("/category/create", inputCategoryMiddleware, categoryController.CreateCategory.bind(categoryController))
  app.get("/categories", categoryController.getAllCategories.bind(categoryController))
}