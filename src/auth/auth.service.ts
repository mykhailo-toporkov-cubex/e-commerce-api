import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto, RegisterDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async login(body: LoginDto) {
    return 'test';
  }

  async register(body: RegisterDto) {
    const newUser = await this.prisma.user.create({
      data: { email: body.email, hash: body.password, role: body.role },
    });

    return newUser;
  }
}
