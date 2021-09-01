import { createTheme, ThemeProvider } from "@material-ui/core";

const appTheme = createTheme({
  palette: {
    primary: {
      main: "#88FCA3",
    },
  },
});

interface AppThemeProviderProps {
  children: React.ReactNode;
}

export default function AppThemeProvider(props: AppThemeProviderProps) {
  return <ThemeProvider theme={appTheme}>{props.children}</ThemeProvider>;
}
