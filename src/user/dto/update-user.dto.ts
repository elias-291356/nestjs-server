import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString({ message: 'Der Name muss ein String sein.' })
  @IsNotEmpty({ message: 'Der Name ist ein Pflichtfeld.' })
  name: string;

  @IsString({ message: 'Die E-Mail muss ein String sein.' })
  @IsEmail({}, { message: 'Ungültiges E-Mail-Format.' })
  @IsNotEmpty({ message: 'Die E-Mail ist ein Pflichtfeld.' })
  email: string;

  @IsBoolean({ message: 'isTwoFactorEnabled muss ein boolescher Wert sein.' })
  isTwoFactorEnabled: boolean;
}
