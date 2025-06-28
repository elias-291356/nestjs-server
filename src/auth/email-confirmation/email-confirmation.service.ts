import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Request } from 'express';
import { v4 as uuidv4 } from 'uuid';

import { MailService } from '@/libs/mail/mail.service';
import { PrismaService } from '@/prisma/prisma.service';
import { TokenType } from 'prisma/__generated__';
import { UserService } from '@/user/user.service';

import { AuthService } from '../auth.service';

import { ConfirmationDto } from './dto/confirmation.dto';

@Injectable()
export class EmailConfirmationService {
  public constructor(
    private readonly prismaService: PrismaService,
    private readonly mailService: MailService,
    private readonly userService: UserService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  public async newVerification(req: Request, dto: ConfirmationDto) {
    const existingToken = await this.prismaService.token.findUnique({
      where: {
        token: dto.token,
        type: TokenType.VERIFICATION,
      },
    });
    if (!existingToken) {
      throw new NotFoundException(
        'Bestätigungstoken wurde nicht gefunden. Bitte stellen Sie sicher, dass Sie einen gültigen Token haben.',
      );
    }

    const hasExpired = new Date(existingToken.expiresIn) < new Date();
    if (hasExpired) {
      throw new BadRequestException(
        'Der Bestätigungstoken ist abgelaufen. Bitte fordern Sie einen neuen Token an.',
      );
    }

    const existingUser = await this.userService.findByEmail(
      existingToken.email,
    );
    if (!existingUser) {
      throw new NotFoundException(
        'Benutzer wurde nicht gefunden. Bitte überprüfen Sie die eingegebene E-Mail-Adresse und versuchen Sie es erneut.',
      );
    }

    await this.prismaService.user.update({
      where: {
        id: existingUser.id,
      },
      data: {
        isVerified: true,
      },
    });
    await this.prismaService.token.delete({
      where: {
        id: existingToken.id,
        type: TokenType.VERIFICATION,
      },
    });
    return this.authService.saveSession(req, existingUser);
  }

  public async sendVerificationToken(email: string) {
    const verificationToken = await this.generateVerificationToken(email);
    await this.mailService.sendConfirmationEmail(
      verificationToken.email,
      verificationToken.token,
    );
    return true;
  }

  private async generateVerificationToken(email: string) {
    const token = uuidv4();
    const expiresIn = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await this.prismaService.token.findFirst({
      where: {
        email,
        type: TokenType.VERIFICATION,
      },
    });

    if (existingToken) {
      await this.prismaService.token.delete({
        where: {
          id: existingToken.id,
          type: TokenType.VERIFICATION,
        },
      });
    }

    const verificationToken = await this.prismaService.token.create({
      data: {
        email,
        token,
        expiresIn,
        type: TokenType.VERIFICATION,
      },
    });

    return verificationToken;
  }
}
