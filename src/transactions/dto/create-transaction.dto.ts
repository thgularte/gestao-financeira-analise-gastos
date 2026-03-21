import {
  IsNumber,
  IsString,
  IsEnum,
  IsOptional,
  IsDate,
} from 'class-validator';

export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

export enum PaymentMethod {
  CASH = 'cash',
  CREDIT = 'credit',
  DEBIT = 'debit',
}

export class CreateTransactionDto {
  @IsString()
  title: string;

  @IsNumber()
  amount: number;

  @IsEnum(TransactionType)
  type: TransactionType;

  @IsDate()
  date: Date;

  @IsString()
  user_id: string;

  @IsString()
  category_id: string;

  @IsOptional()
  @IsString()
  card_id?: string;

  @IsString()
  payment_method: PaymentMethod;
}
