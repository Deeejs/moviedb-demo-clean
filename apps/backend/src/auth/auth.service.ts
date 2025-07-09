import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    if (email !== 'demo@example.com' || pass !== 'password') {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: email, sub: 'demo-user-id' };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
