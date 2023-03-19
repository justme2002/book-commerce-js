import cloudinary from 'cloudinary'

export class CloudinaryService
{
  public CloudinaryConfig?: cloudinary.ConfigOptions
  constructor() {}

  public async uploadFile(files: string): Promise<cloudinary.UploadApiResponse>
  {
    try {
      const result = await cloudinary.v2.uploader.upload(files)
      return result
    } catch (error) {
      console.log(error)
      return {} as cloudinary.UploadApiResponse
    }
  }
}