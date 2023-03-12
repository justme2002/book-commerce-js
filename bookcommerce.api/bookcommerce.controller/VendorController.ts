import { Request, Response } from "express";
import { VendorCreationRequest } from "../bookcommerce.infrastructure/DTO/requests/VendorCreationRequest";
import { BaseResponse } from "../bookcommerce.infrastructure/DTO/Responses/BaseResponse";
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
      return res.status(200).json(new BaseResponse({
        status: false,
        message: "failed to create profile"
      }))
    } 
    return res.status(200).json(new BaseResponse({
      status: true,
      message: "create profile successfully"
    }))
  }
}