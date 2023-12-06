import { createTheme } from '@mui/material/styles';

import componentStyleOverrides from './compStyleOverride';
import themePalette from './palette';
import themeTypography from './typography';
import colors from 'assets/scss/_themes-vars.module.scss';

export const theme = (customization) => {
  const color = colors;
  const themeOption = {
    colors: color,
    heading: color.grey900,
    paper: color.paper,
    backgroundDefault: color.paper,
    background: color.primaryLight,
    darkTextPrimary: color.grey700,
    darkTextSecondary: color.grey500,
    textDark: color.grey900,
    menuSelected: color.secondaryDark,
    menuSelectedBack: color.secondaryLight,
    divider: color.grey200,
    fontFamily: 'Source Sans Pro',
    customization
  };
  const themeOptions = {
    direction: 'ltr',
    palette: themePalette(themeOption),
    mixins: {
      toolbar: {
        minHeight: '66px',
        padding: '8px 24px',
        '@media (min-width: 600px)': {
          minHeight: '66px'
        }
      }
    },
    typography: themeTypography(themeOption)
  };
  const themes = createTheme(themeOptions);
  themes.components = componentStyleOverrides(themeOption);

  return themes;
};

export default theme;
