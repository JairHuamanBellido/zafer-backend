import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../schemas/user.schema';
import { UserExceptionService } from './service/user-exception.service';
import {
  Organization,
  OrganizationSchema,
} from '../../schemas/organization.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Organization.name, schema: OrganizationSchema },
    ]),
  ],
  providers: [UserService, UserExceptionService],
  controllers: [UserController],
})
export class UserModule {}
