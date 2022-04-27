const contentSize = {
  height: 200,
  width: 100
};

const layoutMeasurement = {
  height: 100,
  width: 100
};

export const scrollDownEventData = {
  nativeEvent: {
    contentOffset: {
      y: 200
    },
    contentSize,
    layoutMeasurement
  }
};

export const scrollUpEventData = {
  nativeEvent: {
    contentOffset: {
      y: -1
    },
    contentSize,
    layoutMeasurement
  }
};
