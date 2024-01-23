import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsCompletelyName } from 'src/utils/validators/IsCompletelyName';
import { IsNotStringWithDigitOrSpecialChars } from 'src/utils/validators/IsNotStringWithDigitOrSpecialChars';
import { IsValidPassword } from 'src/utils/validators/IsValidPassword';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  @IsNotStringWithDigitOrSpecialChars()
  @IsCompletelyName()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @IsValidPassword()
  password: string;
}
