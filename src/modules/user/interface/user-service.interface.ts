import { FileUpload } from '../../../models/file-upload.model';
import { SuccessResponse } from '../../../models/global/success-response.model';
import { CreateUser } from '../dto/user.dto';
import { SearchMe, SearchUsers } from '../types/user.type';

export interface IUser {
  create(file: FileUpload, user: CreateUser): SuccessResponse;
  findByName(name: string, userId: string): SearchUsers;
  getPersonalInformation(id: string): SearchMe;
}
