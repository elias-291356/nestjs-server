import { Body, Heading, Link, Tailwind, Text } from '@react-email/components';
import { Html } from '@react-email/html';
import * as React from 'react';

interface ConfirmationTemplateProps {
  domain: string;
  token: string;
}

export function ConfirmationTemplate({
  domain,
  token,
}: ConfirmationTemplateProps) {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  return (
    <Tailwind>
      <Html>
        <Body className="text-black">
          <Heading>E-Mail-Bestätigung</Heading>
          <Text>
            Hallo! Um Ihre E-Mail-Adresse zu bestätigen, klicken Sie bitte auf
            den folgenden Link:
          </Text>
          <Link href={confirmLink}>E-Mail bestätigen</Link>
          <Text>
            Dieser Link ist 1 Stunde lang gültig. Falls Sie keine Bestätigung
            angefordert haben, ignorieren Sie diese Nachricht einfach.
          </Text>
        </Body>
      </Html>
    </Tailwind>
  );
}
