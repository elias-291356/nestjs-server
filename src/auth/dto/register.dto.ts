import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  Validate,
} from 'class-validator';

import { IsPasswordsMatchingConstraint } from '@/libs/common/decorators/is-passwords-matching-constraint.decorator';

export class RegisterDto {
  @IsString({ message: 'Der Name muss ein String sein.' })
  @IsNotEmpty({ message: 'Der Name ist erforderlich.' })
  name: string;
  
  @IsString({ message: 'E-Mail muss ein String sein.' })
  @IsEmail({}, { message: 'Ungültiges E-Mail-Format.' })
  @IsNotEmpty({ message: 'E-Mail ist erforderlich.' })
  email: string;
  
  @IsString({ message: 'Passwort muss ein String sein.' })
  @IsNotEmpty({ message: 'Passwort ist erforderlich.' })
  @MinLength(6, {
    message: 'Passwort muss mindestens 6 Zeichen lang sein.',
  })
  password: string;
  
  @IsString({ message: 'Passwortbestätigung muss ein String sein.' })
  @IsNotEmpty({ message: 'Das Feld für die Passwortbestätigung darf nicht leer sein.' })
  @MinLength(6, {
    message: 'Passwortbestätigung muss mindestens 6 Zeichen lang sein.',
  })
  @Validate(IsPasswordsMatchingConstraint, {
    message: 'Passwörter stimmen nicht überein.',
  })
  
  passwordRepeat: string;
}
