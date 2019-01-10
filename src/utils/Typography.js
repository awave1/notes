import Typography from 'typography';
import fairyGatesTheme from 'typography-theme-fairy-gates';

fairyGatesTheme.overrideStyles = () => ({
  a: {
    color: '#df3131',
    background: 'none',
    textDecoration: 'none',
  },
});

fairyGatesTheme.headerFontFamily = ['Lato', 'sans-serif'];
fairyGatesTheme.bodyFontFamily = ['Open Sans', 'sans-serif'];
fairyGatesTheme.googleFonts = [
  {
    name: 'Open Sans',
    styles: ['300', '400', '500', '600', '700'],
  },
];

const typography = new Typography(fairyGatesTheme);

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles();
}

export default typography;
export const rhythm = typography.rhythm;
export const scale = typography.scale;
