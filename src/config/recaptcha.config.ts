import { isDev } from '@/libs/common/utils/is-dev.util';
import { ConfigService } from '@nestjs/config';
import { GoogleRecaptchaModuleOptions } from '@nestlab/google-recaptcha';

export const getRecaptchaConfig = async (
  configService: ConfigService,
): Promise<GoogleRecaptchaModuleOptions> => ({
  secretKey: configService.getOrThrow<string>(
    'GOOGLE_RECAPTCHA_SECRET_KEY_SERVER',
  ),
  response: (req) => req.headers.recaptcha,
  skipIf: isDev(configService),
});
