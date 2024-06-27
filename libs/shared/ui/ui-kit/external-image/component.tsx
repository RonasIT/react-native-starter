import { Image as CachedImage } from 'expo-image';
import { isFunction } from 'lodash';
import React, { ReactElement, useMemo } from 'react';
import { ImageStyle, StyleProp, TouchableOpacity } from 'react-native';

interface Props {
  uri: string;
  style?: StyleProp<ImageStyle>;
  onPress?: () => void;
}

export function ExternalImage({ uri, style = {}, onPress }: Props): ReactElement {
  const renderedImage = useMemo(() => <CachedImage source={{ uri }} style={style} />, [uri, style]);

  return isFunction(onPress) ? (
    <TouchableOpacity onPress={onPress} delayPressIn={50}>
      {renderedImage}
    </TouchableOpacity>
  ) : (
    renderedImage
  );
}
