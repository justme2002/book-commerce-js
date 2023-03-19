import multer, { StorageEngine, Multer } from "multer";

export class MulterService {

  public Storage?: StorageEngine
  public Upload?: Multer

  constructor(Storage?: StorageEngine, Upload?: Multer)
  {
    this.Storage = Storage
    this.Upload = Upload
  }

  public createStore(): void {
    this.Storage = multer.diskStorage({
      filename: (req, file, callback) => {
        callback(null, `${file.filename}.jpg`)
      },
      destination: (req, file, callback) => {
        callback(null, 'bookcommerce.public/image')
      }
    })
  }
}