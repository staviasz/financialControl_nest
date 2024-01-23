import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsNotStringWithDigitOrSpecialChars } from 'src/utils/validators/IsNotStringWithDigitOrSpecialChars';

export class CreateTransationDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(255)
  @IsNotStringWithDigitOrSpecialChars()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  value: number;

  @IsNotEmpty()
  @IsIn(['withdraw', 'deposit', 'transfer'])
  type: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  categoryId: number;
}
