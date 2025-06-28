import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';

dotenv.config();

export const isDev = (configService: ConfigService): boolean => {
  return configService.getOrThrow('NODE_ENV') === 'production';
};

export const IS_DEV_ENV = process.env.NODE_ENV === 'production';
