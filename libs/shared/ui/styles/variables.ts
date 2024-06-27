import { createStyles } from './extended-stylesheet';

export const colors = {
  background: '#000000',
  backgroundSecondary: '#18191F',
  textPrimary: '#FFFFFF',
  white: '#FFFFFF',
  primary: '#26a0f8',
  danger: '#FF003D'
};

export const spacings = {
  contentOffset: '1.5rem'
};

export const fontFamilies = {
  sfProDisplayBold: 'SFProDisplayBold',
  sfProDisplayRegular: 'SFProDisplayRegular',
  sfProTextRegular: 'SFProTextRegular',
  sfProTextSemiBold: 'SFProTextSemiBold'
};

export const fontSizes = {
  smallest: '0.85rem',
  small: '1rem',
  medium: '1.15rem',
  larger: '1.4rem',
  large: '1.55rem',
  largest: '1.7rem'
};

export const typographies = createStyles({
  smallest: {
    fontSize: fontSizes.smallest,
    lineHeight: '1.38rem',
    fontFamily: fontFamilies.sfProTextRegular
  },
  small: {
    fontSize: fontSizes.small,
    lineHeight: '1.84rem',
    fontFamily: fontFamilies.sfProTextRegular
  },
  medium: {
    fontSize: fontSizes.medium,
    lineHeight: '1.54rem',
    fontFamily: fontFamilies.sfProTextRegular
  },
  larger: {
    fontSize: fontSizes.larger,
    lineHeight: '1.54rem',
    fontFamily: fontFamilies.sfProDisplayRegular
  },
  large: {
    fontSize: fontSizes.large,
    lineHeight: '2.46rem',
    fontFamily: fontFamilies.sfProDisplayBold
  },
  largest: {
    fontSize: fontSizes.largest,
    lineHeight: '2.46rem',
    fontFamily: fontFamilies.sfProDisplayBold
  }
});
