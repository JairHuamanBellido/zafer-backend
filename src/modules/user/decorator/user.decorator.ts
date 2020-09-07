import { createParamDecorator, ExecutionContext, Logger } from '@nestjs/common';
import {} from 'module';
import { JwtService } from '@nestjs/jwt';
export const UserJwt = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();
    console.log('TOKEN: ', process.env.KEY_JWT);
    const jwtService = new JwtService({ secret: process.env.KEY_JWT });
    const token = request.headers.authorization.split(' ')[1];
    Logger.log(token);
    return jwtService.decode(token)['id'];
  },
);
