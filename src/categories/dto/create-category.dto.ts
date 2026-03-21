import { IsNotEmpty, IsString, IsEnum } from 'class-validator';

export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(TransactionType, { message: 'Type must be income or expense' })
  type: TransactionType;

  @IsString()
  @IsNotEmpty()
  user_id: string;
}