import { Heading, Text } from '@eleven-labs/design-system';
import * as React from 'react';

export interface NotFoundPageProps {
  title: string;
  description: string;
  subDescription: string;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ title, description, subDescription }) => (
  <>
    <Heading>{title}</Heading>
    <Text>{description}</Text>
    <Text>{subDescription}</Text>
  </>
);
