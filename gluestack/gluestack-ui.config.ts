import { AnimationResolver } from '@gluestack-style/animation-resolver';
import { MotionAnimationDriver } from '@gluestack-style/legend-motion-animation-driver';
import { createConfig, createComponents } from '@gluestack-style/react';
import * as componentsTheme from './theme';

export const gluestackUIConfig = createConfig({
  aliases: {
    bg: 'backgroundColor',
    h: 'height',
    w: 'width',
    p: 'padding',
    px: 'paddingHorizontal',
    py: 'paddingVertical',
    pt: 'paddingTop',
    pb: 'paddingBottom',
    pr: 'paddingRight',
    pl: 'paddingLeft',
    m: 'margin',
    mx: 'marginHorizontal',
    my: 'marginVertical',
    mt: 'marginTop',
    mb: 'marginBottom',
    mr: 'marginRight',
    ml: 'marginLeft',
    rounded: 'borderRadius'
  } as const,
  tokens: {
    colors: {
      black: '#000000',
      darkBlue: '#18191F',
      white: '#FFFFFF',
      blue: '#26a0f8',
      red: '#FF003D',
      grey: '#808080',

      textColor: '#FFFFFF',
      backgroundColor: '#FFFFFF'
    },
    space: {
      x24: 24,
      x20: 20
    },
    breakpoints: {
      base: 0,
      sm: 360
    },
    mediaQueries: {
      base: '@media screen and (min-width: 0)',
      xs: '@media screen and (min-width: 360px)'
    },
    lineHeights: {
      smallest: 22,
      small: 24,
      medium: 24,
      larger: 24,
      large: 40,
      largest: 40
    },
    fonts: {
      sfProDisplayBold: 'SFProDisplayBold',
      sfProDisplayRegular: 'SFProDisplayRegular',
      sfProTextRegular: 'SFProTextRegular',
      sfProTextSemiBold: 'SFProTextSemiBold'
    },
    fontSizes: {
      smallest: 14,
      small: 16,
      medium: 18,
      larger: 22,
      large: 24,
      largest: 28
    }
  } as const,
  plugins: [new AnimationResolver(MotionAnimationDriver)],
  themes: {
    light: {
      colors: {
        $textColor: '$black',
        $backgroundColor: '$white'
      }
    },
    dark: {
      colors: {
        $textColor: '$white',
        $backgroundColor: '$black'
      }
    }
  }
});

type Config = typeof gluestackUIConfig; // Assuming `config` is defined elsewhere

type Components = typeof componentsConfig;

export const componentsConfig = createComponents(componentsTheme);

export type { UIConfig, UIComponents } from '@gluestack-ui/themed';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IConfig {}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IComponents {}

declare module '@gluestack-ui/themed' {
  interface UIConfig extends Omit<Config, keyof IConfig>, IConfig {}
  interface UIComponents extends Omit<Components, keyof IComponents>, IComponents {}
}

export const config = {
  ...gluestackUIConfig,
  components: componentsConfig
};
