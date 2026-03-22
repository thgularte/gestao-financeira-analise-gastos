import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Injectable()
export class CardsService {
  constructor(private prisma: PrismaService) {}

  async create(createCardDto: CreateCardDto) {
    return this.prisma.card.create({
      data: {
        name: createCardDto.name,
        limit: createCardDto.limit,
        closing_day: createCardDto.closing_day,
        user_id: createCardDto.user_id, // associando ao usuário
      },
    });
  }

  async findCardsUser(userId: string) {
    return this.prisma.card.findMany({
      where: { user_id: userId },
    });
  }

  async update(id: string, updateCardDto: UpdateCardDto) {
    return this.prisma.card.update({
      where: { id_card: id },
      data: { ...updateCardDto },
    });
  }

  async remove(id: string) {
    return this.prisma.card.delete({
      where: { id_card: id },
    });
  } 
}