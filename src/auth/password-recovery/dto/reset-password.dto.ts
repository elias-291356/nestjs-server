import { IsEmail, IsNotEmpty } from 'class-validator';

export class ResetPasswordDto {
  @IsEmail({}, { message: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.' })
  @IsNotEmpty({ message: 'Das E-Mail-Feld darf nicht leer sein.' })
  email: string;
}
