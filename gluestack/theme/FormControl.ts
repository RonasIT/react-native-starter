import { createStyle } from '@gluestack-style/react';

export const FormControl = createStyle({
  flexDirection: 'column',
  _errorText: { color: '$red', mt: 4 },
  ':invalid': {
    borderColor: '$red'
  },
  variants: {
    size: {
      md: {
        _errorText: {
          props: { size: 'smallest' }
        }
      }
    }
  },

  defaultProps: {
    size: 'md'
  }
});
