import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { PartialDeep } from 'type-fest';

const contentSize = {
  height: 200,
  width: 100
};

const layoutMeasurement = {
  height: 100,
  width: 100
};

export const scrollDownEventData: PartialDeep<NativeSyntheticEvent<NativeScrollEvent>> = {
  nativeEvent: {
    contentOffset: {
      x: 0,
      y: contentSize.height
    },
    contentSize,
    layoutMeasurement
  }
};

export const scrollUpEventData: PartialDeep<NativeSyntheticEvent<NativeScrollEvent>> = {
  nativeEvent: {
    contentOffset: {
      x: 0,
      y: -contentSize.height
    },
    contentSize,
    layoutMeasurement
  }
};
