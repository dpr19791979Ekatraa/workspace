import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { verifyToken } from '@clerk/backend';

@Injectable()
export class ClerkAuthGuard
  implements CanActivate
{
  async canActivate(
    context: ExecutionContext,
  ) {
    const request =
      context
        .switchToHttp()
        .getRequest();

    const authHeader =
      request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException();
    }

    const token =
      authHeader.replace(
        'Bearer ',
        '',
      );

    try {
      const payload =
        await verifyToken(
          token,
          {
            secretKey:
              process.env.CLERK_SECRET_KEY!,
          },
        );

      const userId =
        (payload as { userId?: string; sub?: string })
          .userId ??
        (payload as { userId?: string; sub?: string })
          .sub;

      request.auth = {
        ...payload,
        userId,
      };
      request.user = {
        id: userId,
        ...payload,
      };

      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }
}