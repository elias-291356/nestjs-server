import { ConfvigService } from '@nestjs/config';

import 'dotenv/config';

export const isDev = (configService: ConfvigService) => {
  configService.getOrThrow('NODE_ENV') === 'development';
};

export const IS_DEV_ENV = process.env.NODE_ENV === 'development';
