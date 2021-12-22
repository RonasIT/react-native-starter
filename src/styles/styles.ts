import { Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { createStyles } from './extended-stylesheet';
import { variables } from './variables';

export const screenWidth = Dimensions.get('window').width;
export const rem = 13;

EStyleSheet.build({
  $rem: rem,
  $screenWidth: screenWidth
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
