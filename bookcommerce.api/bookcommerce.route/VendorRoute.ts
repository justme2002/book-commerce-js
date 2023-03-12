import { Express } from "express";
import { IDIContainer } from 'rsdi'
import { VendorController } from "../bookcommerce.controller/VendorController";
import { authMiddleware } from "../bookcommerce.middleware/AuthMiddleware";

export default function MapVendorRoute(app: Express, diContainer: IDIContainer)
{
  const vendorController = diContainer.get(VendorController)
  app.post("/vendor/create", authMiddleware, vendorController.CreateVendorProfile.bind(vendorController))
}