import { createStyle } from '@gluestack-style/react';

export const Text = createStyle({
  color: '$textColor',
  fontFamily: 'SFProDisplayBold',

  variants: {
    size: {
      smallest: {
        fontSize: '$smallest',
        lineHeight: '$smallest',
        fontFamily: 'SFProTextRegular'
      },
      small: {
        fontSize: '$small',
        lineHeight: '$small',
        fontFamily: 'SFProTextRegular'
      },
      medium: {
        fontSize: '$medium',
        lineHeight: '$medium',
        fontFamily: 'SFProTextRegular'
      },
      larger: {
        fontSize: '$larger',
        lineHeight: '$larger',
        fontFamily: 'SFProDisplayBold'
      },
      largest: {
        fontSize: '$largest',
        lineHeight: '$largest',
        fontFamily: 'SFProDisplayBold'
      }
    }
  },

  defaultProps: {
    size: 'medium'
  }
});
