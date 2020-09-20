import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Game, GameSchema } from '../../schemas/game.schema';
import {
  Organization,
  OrganizationSchema,
} from '../../schemas/organization.schema';
import { User, UserSchema } from '../../schemas/user.schema';
import { OrganizationsController } from './controller/organizations.controller';
import { OrganizationExceptionService } from './service/organization-exception.service';
import { OrganizationsService } from './service/organizations.service';

@Module({
  controllers: [OrganizationsController],
  imports: [
    MongooseModule.forFeature([
      { name: Organization.name, schema: OrganizationSchema },
      { name: User.name, schema: UserSchema },
      { name: Game.name, schema: GameSchema },
    ]),
  ],
  providers: [OrganizationsService, OrganizationExceptionService],
})
export class OrganizationsModule {}
