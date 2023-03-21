import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return `This action returns all user`;
  }

  async findOneById(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    return user;
  }

  async updateOneById(userId: string, updateUserInput: UpdateUserInput) {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: { ...updateUserInput },
    });
    return user;
  }

  async removeOneById(userId: string) {
    const { id } = await this.prisma.user.delete({ where: { id: userId } });
    return `User with ${id} has been removed`;
  }
}
