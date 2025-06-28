import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class NewPasswordDto {
  @IsString({ message: 'Das Passwort muss ein String sein.' })
  @MinLength(6, {
    message: 'Das Passwort muss mindestens 6 Zeichen enthalten.',
  })
  @IsNotEmpty({ message: 'Das Feld „Neues Passwort“ darf nicht leer sein.' })
  password: string;
}
