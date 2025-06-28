import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class LoginDto {
  @IsString({ message: 'E-Mail muss ein String sein.' })
  @IsEmail({}, { message: 'Ungültiges E-Mail-Format.' })
  @IsNotEmpty({ message: 'E-Mail ist erforderlich.' })
  email: string;
  
  @IsString({ message: 'Passwort muss ein String sein.' })
  @IsNotEmpty({ message: 'Das Passwortfeld darf nicht leer sein.' })
  @MinLength(6, { message: 'Passwort muss mindestens 6 Zeichen lang sein.' })
  
  password: string;

  @IsOptional()
  @IsString()
  code: string;
}
