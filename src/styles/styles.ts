import { Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Colors, Typography } from 'react-native-ui-lib';
import { createStyles } from './extended-stylesheet';
import { variables } from './variables';

export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;
export const isSmallScreen = screenWidth <= 360;
export const rem = isSmallScreen ? 13 : 16;

EStyleSheet.build({
  $rem: rem,
  $screenWidth: screenWidth
});

Colors.loadColors({
  background: '#000000',
  backgroundSecondary: '#18191F',
  white: '#FFFFFF',
  primary: '#26a0f8',
  danger: '#FF003D'
});

Typography.loadTypographies({
  smallest: {
    fontSize: 0.85 * rem,
    lineHeight: 1.38 * rem,
    fontFamily: variables.fontFamily.sfProTextRegular
  },
  small: {
    fontSize: rem,
    lineHeight: 1.84 * rem,
    fontFamily: variables.fontFamily.sfProTextRegular
  },
  medium: {
    fontSize: 1.15 * rem,
    lineHeight: 1.54 * rem,
    fontFamily: variables.fontFamily.sfProTextRegular
  },
  larger: {
    fontSize: 1.4 * rem,
    lineHeight: 1.54 * rem,
    fontFamily: variables.fontFamily.sfProDisplayRegular
  },
  large: {
    fontSize: 1.55 * rem,
    lineHeight: 2.46 * rem,
    fontFamily: variables.fontFamily.sfProDisplayBold
  },
  largest: {
    fontSize: 1.7 * rem,
    lineHeight: 2.46 * rem,
    fontFamily: variables.fontFamily.sfProDisplayBold
  }
});

export const commonStyle = createStyles({
  container: {
    paddingHorizontal: variables.contentOffset
  },
  formInput: {
    color: variables.color.white,
    fontSize: variables.fontSize.medium,
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
    backgroundColor: variables.color.backgroundSecondary,
    borderColor: variables.color.backgroundSecondary,
    borderRadius: 10,
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
    width: '100%',
    alignItems: 'center'
  },
  formControlError: {
    borderColor: variables.color.danger
  },
  formControlFocus: {
    borderColor: variables.color.primary
  },
  formGroup: {
    marginBottom: '1.2rem'
  },
  formGroupLabel: {
    marginBottom: '0.5rem',
    color: Colors.white,
    ...Typography.larger
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
