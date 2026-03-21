import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService ) {}
  
  async create(dto: CreateUserDto) {

    const hashPassword = await bcrypt.hash(dto.password, 10);
    return await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: hashPassword,
        fixed_income: dto.fixed_income
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
        transactions: true
      }
    });
  }

  async getByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email: email },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.prisma.user.update({
      where: {
        id_user: id,
      },
      data: updateUserDto,
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
