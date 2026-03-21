import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {} // construtor para injetar o PrismaService

  create(createTransactionDto: CreateTransactionDto) {
    return this.prisma.transaction.create({
      data: {
        title: createTransactionDto.title,
        amount: createTransactionDto.amount,
        type: createTransactionDto.type,
        date: new Date(createTransactionDto.date),
        category_id: createTransactionDto.category_id,
        card_id: createTransactionDto.card_id,
        payment_method: createTransactionDto.payment_method,
        user_id: createTransactionDto.user_id,
      },
    });
  }

  getExpenses(user_id: string) {
    return this.prisma.transaction.findMany({
      where: { user_id, type: 'expense' },
      orderBy: { date: 'desc' },
    });
  }

  getIncome(user_id: string) {
    return this.prisma.transaction.findMany({
      where: { user_id, type: 'income' },
      orderBy: { date: 'desc' },
    });
  }

  update(id: string, updateTransactionDto: UpdateTransactionDto) {
    return this.prisma.transaction.update({
      where: { id_transaction: id },
      data: {
        title: updateTransactionDto.title,
        amount: updateTransactionDto.amount,
        type: updateTransactionDto.type,
        date: updateTransactionDto.date,
        category_id: updateTransactionDto.category_id,
        card_id: updateTransactionDto.card_id,
        payment_method: updateTransactionDto.payment_method,
        user_id: updateTransactionDto.user_id,
      },
    });
  }
}
