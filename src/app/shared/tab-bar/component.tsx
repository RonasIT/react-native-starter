import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React, { ReactElement, useMemo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { AppText } from '@shared/text';
import { colors, createStyles } from '@styles';

export function AppTabBar({ state, descriptors, navigation }: BottomTabBarProps): ReactElement {
  const tabBarItems = useMemo(
    () => state.routes.map((route, index) => {
      const { options } = descriptors[route.key];
      const label = options.tabBarLabel || options.title || route.name;
      const isFocused = state.index === index;
      const tabItemColor = isFocused ? colors.primary : colors.white;

      const onPress = (): void => {
        const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });

        if (!isFocused && !event.defaultPrevented) {
          navigation.navigate(route.name);
        }
      };
      const onLongPress = (): void => {
        navigation.emit({ type: 'tabLongPress', target: route.key });
      };

      return (
        <TouchableOpacity
          accessibilityRole='button'
          accessibilityState={isFocused ? { selected: true } : {}}
          accessibilityLabel={options.tabBarAccessibilityLabel}
          onPress={onPress}
          key={route.name}
          onLongPress={onLongPress}
          style={style.tabButton}
          activeOpacity={0.8}
          testID='tab-bar-item'>
          {options.tabBarIcon({ focused: isFocused, color: tabItemColor, size: 30 })}
          <AppText smallest style={[style.tabItemText, { color: tabItemColor }]}>
            {label}
          </AppText>
        </TouchableOpacity>
      );
    }),
    [descriptors, navigation, state.index, state.routes]
  );

  return (
    <View style={style.tabBarContainer}>
      <View style={style.tabBar}>{tabBarItems}</View>
    </View>
  );
}

const style = createStyles({
  tabBarContainer: {
    backgroundColor: colors.background
  },
  tabBar: {
    flexDirection: 'row'
  },
  tabButton: {
    height: 60,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
  tabItemText: {
    lineHeight: '1rem',
    marginTop: 4
  }
});
