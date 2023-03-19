import { Request, Response } from "express";
import { VendorCreationRequest } from "../bookcommerce.infrastructure/DTO/requests/VendorCreationRequest";
import { BaseResponse } from "../bookcommerce.infrastructure/DTO/Responses/BaseResponse";
import { VendorResponse } from "../bookcommerce.infrastructure/DTO/Responses/VendorResponse";
import { VendorService } from "../bookcommerce.service/VendorService";

export class VendorController
{
  constructor(private readonly vendorService: VendorService)
  {

  }

  //POST /vendor/create
  public async CreateVendorProfile(req: Request, res: Response) : Promise<Response>
  {
    const { vendorName } = req.body
    const vendorCreationRequest = new VendorCreationRequest(vendorName)
    const result = await this.vendorService.createProfile(vendorCreationRequest, String(req.id))
    if (!result) {
      return res.status(400).json(new BaseResponse({
        status: false,
        message: "failed to create profile"
      }))
    } 
    return res.status(200).json(new BaseResponse({
      status: true,
      message: "create profile successfully"
    }))
  }

  //GET /vendor/:id
  public async getVendor(req: Request, res: Response) : Promise<Response>
  {
    const { id } = req.params
    const vendor = await this.vendorService.viewProfile(id)
    if (!vendor) {
      return res.status(404).json(new BaseResponse({
        status: false,
        message: "no vendor found"
      }))
    }
    return res.status(200).json(new VendorResponse({
      status: true,
      message: "get vendor successfully",
      vendor
    }))
  }
}