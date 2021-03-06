import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
export const UserJwt = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();
    const jwtService = new JwtService({ secret: process.env.KEY_JWT });
    const token = request.headers.authorization.split(' ')[1];
    return jwtService.decode(token)['id'];
  },
);
