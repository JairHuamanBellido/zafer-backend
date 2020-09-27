import { Test, TestingModule } from '@nestjs/testing';
import { RequestInvitationController } from '../controller/request-invitation.controller';

describe('RequestInvitationController', () => {
  let controller: RequestInvitationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RequestInvitationController],
    }).compile();

    controller = module.get<RequestInvitationController>(RequestInvitationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
