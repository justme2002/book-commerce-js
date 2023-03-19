import { Express } from "express";
import { IDIContainer } from 'rsdi'
import { SubCategoryController } from "../bookcommerce.controller/SubCategoryController";
import { authMiddleware } from "../bookcommerce.middleware/AuthMiddleware";

export default function MapSubCategoryRoute (app: Express, diContainer: IDIContainer)
{
  const subCategoryController = diContainer.get(SubCategoryController)
  app.get("/sub-categories", subCategoryController.getSubCategoriesByVendorId.bind(subCategoryController))
  app.post("/sub-category/create", authMiddleware, subCategoryController.createSubCategory.bind(subCategoryController))
}

