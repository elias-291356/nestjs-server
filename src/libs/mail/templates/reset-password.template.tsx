import { Body, Heading, Link, Tailwind, Text } from '@react-email/components';
import { Html } from '@react-email/html';
import * as React from 'react';

interface ResetPasswordTemplateProps {
  domain: string;
  token: string;
}

export function ResetPasswordTemplate({
  domain,
  token,
}: ResetPasswordTemplateProps) {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  return (
    <Tailwind>
      <Html>
        <Body className="text-black">
          <Heading>Passwort zurücksetzen</Heading>
          <Text>
            Hallo! Sie haben eine Passwortzurücksetzung angefordert. Bitte
            klicken Sie auf den folgenden Link, um ein neues Passwort zu
            erstellen:
          </Text>
          <Link href={resetLink}>Passwort zurücksetzen bestätigen</Link>
          <Text>
            Dieser Link ist 1 Stunde lang gültig. Falls Sie keine
            Passwortzurücksetzung angefordert haben, ignorieren Sie diese
            Nachricht einfach.
          </Text>
        </Body>
      </Html>
    </Tailwind>
  );
}
