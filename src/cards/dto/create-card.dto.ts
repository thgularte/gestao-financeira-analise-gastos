import { IsNotEmpty, IsString, IsNumber, Min, Max } from 'class-validator';

export class CreateCardDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'Limit must be a number with up to 2 decimals' })
  @Min(0)
  limit: number;

  @IsNumber()
  @Min(1)
  @Max(31)
  closing_day: number; 

  @IsString()
  @IsNotEmpty()
  user_id: string;
}