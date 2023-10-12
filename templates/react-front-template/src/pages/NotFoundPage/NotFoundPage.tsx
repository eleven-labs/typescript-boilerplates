import { Heading, Text } from '@eleven-labs/design-system';
import * as React from 'react';

export interface NotFoundPageProps {
  description: string;
  subDescription: string;
  title: string;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ description, subDescription, title }) => (
  <>
    <Heading>{title}</Heading>
    <Text>{description}</Text>
    <Text>{subDescription}</Text>
  </>
);
