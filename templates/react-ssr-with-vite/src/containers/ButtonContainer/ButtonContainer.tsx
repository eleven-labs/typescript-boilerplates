import { Button } from '@eleven-labs/design-system';
import * as React from 'react';

export const ButtonContainer: React.FC = () => {
  const [number, increment] = React.useState<number>(0);

  return (
    <Button
      onClick={(): void => {
        increment((n) => n + 1);
      }}
    >
      Increment {number}
    </Button>
  );
};
