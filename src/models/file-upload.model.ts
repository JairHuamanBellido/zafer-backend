export class FileUpload {
  readonly fieldname: string;
  readonly originalname: string;
  readonly encoding: string;
  readonly mimetype: string;
  readonly buffer: Buffer;
  readonly size: number;
}
