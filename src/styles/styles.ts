import { Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Typography } from 'react-native-ui-lib';
import { createStyles } from './extended-stylesheet';
import { colors, fontFamilies, spacings } from './variables';

export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;
export const isSmallScreen = screenWidth <= 360;
export const rem = isSmallScreen ? 13 : 16;

EStyleSheet.build({
  $rem: rem,
  $screenWidth: screenWidth
});

Typography.loadTypographies({
  smallest: {
    fontSize: 0.85 * rem,
    lineHeight: 1.38 * rem,
    fontFamily: fontFamilies.sfProTextRegular
  },
  small: {
    fontSize: rem,
    lineHeight: 1.84 * rem,
    fontFamily: fontFamilies.sfProTextRegular
  },
  medium: {
    fontSize: 1.15 * rem,
    lineHeight: 1.54 * rem,
    fontFamily: fontFamilies.sfProTextRegular
  },
  larger: {
    fontSize: 1.4 * rem,
    lineHeight: 1.54 * rem,
    fontFamily: fontFamilies.sfProDisplayRegular
  },
  large: {
    fontSize: 1.55 * rem,
    lineHeight: 2.46 * rem,
    fontFamily: fontFamilies.sfProDisplayBold
  },
  largest: {
    fontSize: 1.7 * rem,
    lineHeight: 2.46 * rem,
    fontFamily: fontFamilies.sfProDisplayBold
  }
});

export const commonStyle = createStyles({
  container: {
    paddingHorizontal: spacings.contentOffset
  },
  formInput: {
    color: colors.white,
    fontSize: Typography.medium.fontSize,
    height: 54,
    paddingTop: 15,
    paddingBottom: 15,
    flex: 1
  },
  formInputDisabled: {
    opacity: 0.5
  },
  formInputIcon: {
    top: 0,
    height: '100%',
    position: 'absolute',
    width: 30,
    justifyContent: 'center',
    right: 20
  },
  formControl: {
    position: 'relative',
    borderWidth: 1,
    backgroundColor: colors.backgroundSecondary,
    borderColor: colors.backgroundSecondary,
    borderRadius: 10,
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
    width: '100%',
    alignItems: 'center'
  },
  formControlError: {
    borderColor: colors.danger
  },
  formControlFocus: {
    borderColor: colors.primary
  },
  formGroup: {
    marginBottom: '1.2rem'
  },
  formGroupLabel: {
    marginBottom: '0.5rem',
    color: colors.white,
    ...Typography.larger
  },
  formGroupError: {
    color: colors.danger,
    ...Typography.small
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -5
  },
  col: {
    flex: 1,
    marginHorizontal: 5
  }
});
