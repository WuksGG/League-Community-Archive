import { extendTheme } from '@chakra-ui/react';

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const fonts = {};

const colors = {
  light: {
    900: '',
    800: '',
    700: '',
    600: '',
    500: '',
    400: '',
    300: '',
    200: '',
    100: '',
  },
  dark: {
    900: '',
    800: '',
    700: '',
    600: '',
    500: '',
    400: '',
    300: '',
    200: '',
    100: '',
  },
};

export const theme = extendTheme({ colors, fonts, config });
