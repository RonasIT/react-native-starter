import { createStyle } from '@gluestack-style/react';

export const Button = createStyle({
  borderRadius: 12,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  _text: {
    color: '$white'
  },
  _spinner: {
    props: {
      color: '$white',
      ml: 4
    }
  },
  variants: {
    action: {
      primary: {
        bg: '$blue',
        ':active': {
          bg: '$darkBlue'
        },
        _text: {
          color: '$white',
          fontFamily: 'SFProDisplayBold',
          fontSize: '$medium'
        }
      }
    },
    size: {
      medium: {
        padding: 13
      },
      small: {
        padding: 10,
        width: 'auto',
        alignSelf: 'flex-start',
        _text: {
          fontSize: '$small',
          fontFamily: 'SFProTextRegular'
        }
      }
    }
  },
  ':disabled': {
    opacity: 0.4
  },
  defaultProps: {
    action: 'primary',
    size: 'medium'
  }
});
