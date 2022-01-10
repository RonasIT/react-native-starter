import { isFunction } from 'lodash';
import React, { ReactElement } from 'react';
import { Image, ImageStyle, Platform, StyleProp, TouchableOpacity } from 'react-native';
import { Image as CachedImage } from 'react-native-expo-image-cache';

interface Props {
  uri: string;
  style?: StyleProp<ImageStyle>;
  onPress?: () => void;
}

export function ExternalImage({ uri, style = {}, onPress }: Props): ReactElement {
  const renderedImage =
    Platform.OS === 'web' ? <Image source={{ uri }} style={style} /> : <CachedImage uri={uri} style={style} />;

  return isFunction(onPress) ? (
    <TouchableOpacity onPress={onPress} delayPressIn={50}>
      {renderedImage}
    </TouchableOpacity>
  ) : (
    renderedImage
  );
}
