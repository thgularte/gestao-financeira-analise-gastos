import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Req,
  Delete,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(createTransactionDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('expenses')
  getMyExpenses(@Req() req) {
    const userId = req.user.id;
    return this.transactionsService.getExpenses(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('income')
  getMyIncome(@Req() req) {
    const userId = req.user.id;
    return this.transactionsService.getIncome(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
    @Req() req,
  ) {
    // evita que um usuário atualize transações de outro
    updateTransactionDto.user_id = req.user.id;
    return this.transactionsService.update(id, updateTransactionDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    const userIdFromToken = req.user.id;
    return this.transactionsService.remove(id, userIdFromToken);
  }
}
