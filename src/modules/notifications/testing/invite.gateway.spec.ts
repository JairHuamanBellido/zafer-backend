import { Test, TestingModule } from '@nestjs/testing';
import { InviteGateway } from '../invite/invite.gateway';

describe('InviteGateway', () => {
  let gateway: InviteGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InviteGateway],
    }).compile();

    gateway = module.get<InviteGateway>(InviteGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
