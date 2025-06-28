import { Body, Heading, Tailwind, Text } from '@react-email/components';
import { Html } from '@react-email/html';
import * as React from 'react';

interface TwoFactorAuthTemplateProps {
  token: string;
}

export function TwoFactorAuthTemplate({ token }: TwoFactorAuthTemplateProps) {
  return (
    <Tailwind>
      <Html>
        <Body className="text-black">
          <Heading>Zwei-Faktor-Authentifizierung</Heading>
          <Text>
            Ihr Zwei-Faktor-Authentifizierungscode: <strong>{token}</strong>
          </Text>
          <Text>
            Bitte geben Sie diesen Code in der Anwendung ein, um den
            Authentifizierungsprozess abzuschließen.
          </Text>
          <Text>
            Falls Sie diesen Code nicht angefordert haben, ignorieren Sie diese
            Nachricht einfach.
          </Text>
        </Body>
      </Html>
    </Tailwind>
  );
}
