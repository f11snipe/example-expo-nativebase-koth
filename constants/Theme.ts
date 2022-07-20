import { extendTheme } from 'native-base';

export const customThemeData = {
  useSystemColorMode: undefined,
  layout: {
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    }
  }
};

export const customTheme = extendTheme(customThemeData);

export default customTheme;
