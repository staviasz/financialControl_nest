import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { IsNotStringWithDigitOrSpecialChars } from 'src/utils/validators/IsNotStringWithDigitOrSpecialChars';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @IsNotStringWithDigitOrSpecialChars()
  @MinLength(3)
  @MaxLength(100)
  name: string;
}
