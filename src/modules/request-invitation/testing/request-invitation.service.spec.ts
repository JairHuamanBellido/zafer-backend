import { Test, TestingModule } from '@nestjs/testing';
import { RequestInvitationService } from '../service/request-invitation.service';

describe('RequestInvitationService', () => {
  let service: RequestInvitationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequestInvitationService],
    }).compile();

    service = module.get<RequestInvitationService>(RequestInvitationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
