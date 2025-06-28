import { IsNotEmpty, IsString } from 'class-validator';

export class ConfirmationDto {
  @IsString({ message: 'Token muss ein String sein.' })
  @IsNotEmpty({ message: 'Das Token-Feld darf nicht leer sein.' })
  token: string;
}
