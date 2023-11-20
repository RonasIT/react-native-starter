import { Button, ButtonText, ButtonSpinner } from '@gluestack-ui/themed';
import React, { ReactElement } from 'react';

interface GluestackButtonProps {
  title?: string;
  isLoading?: boolean;
}

export function GluestackButton({
  title,
  isLoading,
  ...restProps
}: GluestackButtonProps & React.ComponentProps<typeof Button>): ReactElement {
  return (
    <Button {...restProps}>
      <ButtonText>{title}</ButtonText>
      {isLoading && <ButtonSpinner />}
    </Button>
  );
}
