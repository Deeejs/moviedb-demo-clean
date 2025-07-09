import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class CombinedAuthGuard extends AuthGuard('jwt') implements CanActivate {
  private readonly API_SECRET =
    process.env.API_SECRET || 'movie-api-secret-2024';

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    try {
      // First, try JWT authentication
      const jwtResult = await super.canActivate(context);
      if (jwtResult) {
        return true;
      }
    } catch {
      // JWT authentication failed, try API token
      const token = this.extractTokenFromHeader(request);

      if (!token) {
        throw new UnauthorizedException(
          'Authentication required (JWT or API token)',
        );
      }

      if (token === this.API_SECRET) {
        // API token is valid
        // Add a flag to indicate API token authentication
        request['authType'] = 'api-token';
        return true;
      }

      throw new UnauthorizedException('Invalid authentication credentials');
    }

    return false;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
