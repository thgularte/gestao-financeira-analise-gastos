import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    const hashPassword = await bcrypt.hash(dto.password, 10);
    return await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: hashPassword,
        fixed_income: dto.fixed_income,
      },
    });
  }

  async getAll() {
    return await this.prisma.user.findMany();
  }

  async getId(id: string) {
    return await this.prisma.user.findUnique({
      where: {
        id_user: id,
      },
      include: {
        cards: true,
        categories: true,
        transactions: true,
      },
    });
  }

  async getByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email: email },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const userExists = await this.prisma.user.findUnique({
      where: {
        id_user: id,
      },
    });

    if (!userExists) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const dataToUpdate: any = { ...updateUserDto };

    if (updateUserDto.password) {
      const isSamePassword = await bcrypt.compare(
        updateUserDto.password,
        userExists.password,
      );

      if (isSamePassword) {
        throw new BadRequestException(
          'A nova senha não pode ser igual à atual',
        );
      }

      const newHashPassword = await bcrypt.hash(updateUserDto.password, 10);
      dataToUpdate.password = newHashPassword;
    }

    return await this.prisma.user.update({
      where: {
        id_user: id,
      },
      data: dataToUpdate,
    });
  }

  async delete(id: string) {
    return await this.prisma.user.delete({
      where: {
        id_user: id,
      },
    });
  }
}
