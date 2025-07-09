import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: jest.Mocked<JwtService>;

  beforeEach(async () => {
    const mockJwtService = {
      signAsync: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signIn', () => {
    it('should return access token for valid credentials', async () => {
      const mockToken = 'mock-jwt-token';
      jwtService.signAsync.mockResolvedValue(mockToken);

      const result = await service.signIn('demo@example.com', 'password');

      expect(jwtService.signAsync).toHaveBeenCalledWith({
        email: 'demo@example.com',
        sub: 'demo-user-id',
      });
      expect(result).toEqual({
        access_token: mockToken,
      });
    });

    it('should throw UnauthorizedException for invalid email', async () => {
      await expect(
        service.signIn('invalid@example.com', 'password'),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException for invalid password', async () => {
      await expect(
        service.signIn('demo@example.com', 'wrongpassword'),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException for empty credentials', async () => {
      await expect(service.signIn('', '')).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should be case sensitive for email', async () => {
      await expect(
        service.signIn('DEMO@EXAMPLE.COM', 'password'),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should be case sensitive for password', async () => {
      await expect(
        service.signIn('demo@example.com', 'PASSWORD'),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should handle JWT service errors', async () => {
      jwtService.signAsync.mockRejectedValue(new Error('JWT error'));

      await expect(
        service.signIn('demo@example.com', 'password'),
      ).rejects.toThrow('JWT error');
    });
  });
});
