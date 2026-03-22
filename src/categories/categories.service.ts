import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return this.prisma.category.create({
      data: {
        name: createCategoryDto.name,
        type: createCategoryDto.type,
        user_id: createCategoryDto.user_id, // associando ao usuário
      },
    });
  }

  async getCategoriesUser(userId: string) {
    return this.prisma.category.findMany({
      where: { user_id: userId }, 
    });
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return this.prisma.category.update({
      where: { id_category: id },
      data: { ...updateCategoryDto },
    });
  }
  async remove(id: string) {
    return this.prisma.category.delete({
      where: { id_category: id },
    });
  }
}