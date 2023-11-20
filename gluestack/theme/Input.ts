import { createStyle } from '@gluestack-style/react';
import { rem } from '@libs/shared/ui/styles';

export const Input = createStyle({
  borderWidth: 1,
  borderColor: '$darkBlue',
  borderRadius: 10,
  flexDirection: 'row',
  alignContent: 'center',

  ':focus': {
    borderColor: '$blue'
  },

  ':invalid': {
    borderColor: '$red'
  },

  ':disabled': {
    opacity: 0.4
  },

  _input: {
    props: {
      size: 'md'
    }
  },

  variants: {
    size: {
      medium: {
        h: 54,
        py: 15,
        px: 15,
        _input: {
          props: {
            fontSize: '$small',
            lineHeight: 1.125 * rem
          }
        }
      }
    }
  },

  defaultProps: {
    size: 'medium'
  }
});
