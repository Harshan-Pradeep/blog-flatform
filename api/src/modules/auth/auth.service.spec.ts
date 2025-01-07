import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CookieService } from './cookie.service';
import { User } from './entities/user.entity';
import { IUserRepository } from './repositories/user.repository.interface';

jest.mock('../blog/entities/blog.entity', () => ({
  Blog: class MockBlog { }
}));

const mockUserRepository = {
  create: jest.fn(),
  findByEmail: jest.fn(),
  findById: jest.fn(),
  save: jest.fn(),
};

const mockJwtService = {
  sign: jest.fn(),
  verify: jest.fn(),
};

const mockCookieService = {
  createCookie: jest.fn(),
};

jest.mock('./entities/user.entity', () => {
  return {
    User: class MockUser {
      id: number;
      email: string;
      password: string;
      blogs: any[];
      createdDate: Date;
    }
  };
});

describe('AuthService', () => {
  let service: AuthService;
  let userRepository: IUserRepository;
  let jwtService: JwtService;
  let cookieService: CookieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: 'IUserRepository',
          useValue: mockUserRepository,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: CookieService,
          useValue: mockCookieService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userRepository = module.get<IUserRepository>('IUserRepository');
    jwtService = module.get<JwtService>(JwtService);
    cookieService = module.get<CookieService>(CookieService);

    jest.clearAllMocks();
  });

  describe('register', () => {
    const email = 'test@example.com';
    const password = 'password123';

    it('should successfully register a new user', async () => {
      const hashedPassword = 'hashedPassword';
      jest.spyOn(bcrypt, 'hash').mockResolvedValue(hashedPassword as never);

      const newUser = {
        id: 1,
        email,
        password: hashedPassword,
        createdDate: new Date(),
        blogs: []
      } as User;

      mockUserRepository.findByEmail.mockResolvedValue(null);
      mockUserRepository.create.mockResolvedValue(newUser);

      const result = await service.register(email, password);

      expect(result).toEqual(expect.objectContaining({
        id: newUser.id,
        email: newUser.email
      }));
      expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(email);
      expect(mockUserRepository.create).toHaveBeenCalledWith({
        email,
        password: hashedPassword,
      });
    });

    it('should throw ConflictException if email already exists', async () => {
      mockUserRepository.findByEmail.mockResolvedValue({ id: 1 } as User);

      await expect(service.register(email, password)).rejects.toThrow(ConflictException);
      expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(email);
      expect(mockUserRepository.create).not.toHaveBeenCalled();
    });
  });

  describe('validateUser', () => {
    const email = 'test@example.com';
    const password = 'password123';
    const hashedPassword = 'hashedPassword';

    const mockUser = {
      id: 1,
      email,
      password: hashedPassword,
    } as User;

    it('should return user if credentials are valid', async () => {
      mockUserRepository.findByEmail.mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);

      const result = await service.validateUser(email, password);

      expect(result).toEqual(expect.objectContaining({
        id: mockUser.id,
        email: mockUser.email
      }));
      expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(email);
      expect(bcrypt.compare).toHaveBeenCalledWith(password, hashedPassword);
    });

    it('should return null if user not found', async () => {
      mockUserRepository.findByEmail.mockResolvedValue(null);

      const result = await service.validateUser(email, password);

      expect(result).toBeNull();
      expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(email);
    });

    it('should return null if password is incorrect', async () => {
      mockUserRepository.findByEmail.mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false as never);

      const result = await service.validateUser(email, password);

      expect(result).toBeNull();
      expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(email);
      expect(bcrypt.compare).toHaveBeenCalledWith(password, mockUser.password);
    });
  });

  describe('login', () => {
    const email = 'test@example.com';
    const password = 'password123';

    const mockUser = {
      id: 1,
      email,
      password: 'hashedPassword',
    } as User;

    // it('should successfully login a user', async () => {
    //   mockUserRepository.findByEmail.mockResolvedValue(mockUser);
    //   jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);
    //   mockJwtService.sign.mockReturnValue('jwt-token');
    //   mockCookieService.createCookie.mockReturnValue('cookie-string');

    //   const result = await service.login({ sub: mockUser.id, email: mockUser.email });

    //   expect(result).toBeDefined();
    //   expect(mockJwtService.sign).toHaveBeenCalledWith({ 
    //     email: mockUser.email 
    //   });
    //   expect(mockCookieService.createCookie).toHaveBeenCalled();
    // });


    // it('should throw UnauthorizedException if validation fails', async () => {
    //   mockUserRepository.findByEmail.mockResolvedValue(null);

    //   const invalidPayload = { sub: 2, email: 'invalid@example.com' };

    //   await expect(service.login(invalidPayload)).rejects.toThrow(UnauthorizedException);
    //   expect(mockUserRepository.findByEmail).toHaveBeenCalledWith('invalid@example.com');
    // });

  });
});