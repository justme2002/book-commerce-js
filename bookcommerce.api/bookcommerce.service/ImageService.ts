import { Image } from "../bookcommerce.infrastructure/DAL/Entities/Image";
import { ProductVariant } from "../bookcommerce.infrastructure/DAL/Entities/ProductVariant";
import { ImageRepository } from "../bookcommerce.infrastructure/DAL/Repositories/ImageRepository";
import { ProductVariantRepository } from "../bookcommerce.infrastructure/DAL/Repositories/ProductVariantRepository";
import { CloudinaryService } from "./CloudinaryService";
import { IImageService } from "./Interfaces/IImageService";
import cloudinary from 'cloudinary'
import { Product } from "../bookcommerce.infrastructure/DAL/Entities/Product";

export class ImageService implements IImageService
{
  constructor(private imageRepository?: ImageRepository, 
    // private productVariantRepository?: ProductVariantRepository,
    private cloudinaryService?: CloudinaryService) {}

  public async UploadFile(product?: Product, fileUrl?: Express.Multer.File[]): Promise<boolean> {
    try {
      this.imageRepository?.GetRepository(Image)
      // const productVariantToAddImage = await this.getProductVariantId(productVariantId as string)
      if (!product) return false
      const result = await Promise.all(fileUrl?.map(async url => {
        const uploadToCloudinary = await this.cloudinaryService?.uploadFile(url.path)
        const image = new Image(uploadToCloudinary?.url as string, product)
        const saveImageUrlToDb = await this.imageRepository?.AddAsync([image])
        if (!saveImageUrlToDb) return false
      })!)
      console.log(result)
      // const image = new Image(fileUrl![0].originalname, productVariant!)
      // console.log(image)
      // const saveImageUrlToDb = await this.imageRepository?.AddAsync([image])
      // console.log(saveImageUrlToDb)
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }

  // private async getProductVariantId(productVariantId: string): Promise<ProductVariant> {
  //   try {
  //     const result = await this.productVariantRepository?.GetOneBy({
  //       ProductVariantId: productVariantId
  //     })
  //     return result as ProductVariant
  //   } catch (error) {
  //     console.log(error)
  //     return {} as ProductVariant
  //   }
  // }
}

