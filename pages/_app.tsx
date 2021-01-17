import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import theme from 'config/theme';

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
