import { createStyle } from '@gluestack-style/react';

export const InputField = createStyle({
  flex: 1,
  color: '$textColor',
  props: {
    placeholderTextColor: '$grey'
  },
  variants: {
    size: {
      md: {
        fontSize: '$medium',
        lineHeight: '$medium'
      }
    }
  }
});
