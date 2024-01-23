import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from 'src/modules/auth/auth.service';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: AuthService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization.split(' ')[1];

    try {
      const { id } = this.jwt.verifyToken(token);
      request.user = await this.prisma.users.findUniqueOrThrow({
        where: {
          id,
        },
        select: {
          id: true,
          email: true,
          name: true,
        },
      });
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
    return true;
  }
}
