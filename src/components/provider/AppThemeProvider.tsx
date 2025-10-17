"use client";

import * as React from "react";
import { ThemeProvider as NextThemeProvider, useTheme } from "next-themes";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { SnackbarProvider } from "notistack";

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <MuiThemeSyncProvider>{children}</MuiThemeSyncProvider>
    </NextThemeProvider>
  );
}

function MuiThemeSyncProvider({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const mode = mounted && resolvedTheme === "dark" ? "dark" : "light";

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                background: {
                  default: "#ffffff",
                  paper: "#ffffff",
                },
                text: {
                  primary: "#262626",
                  secondary: "#404040",
                },
              }
            : {
                background: {
                  default: "#181A2A",
                  paper: "#181A2A",
                },
                text: {
                  primary: "#ededed",
                  secondary: "#bdbdbd",
                },
              }),
        },
        typography: {
          fontFamily: "var(--font-geist-sans), sans-serif",
        },
      }),
    [mode, mounted],
  );

  if (!mounted) {
    return (
      <div style={{ visibility: "hidden" }}>
        <SnackbarProvider
          maxSnack={3}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <CssBaseline />
          {children}
        </SnackbarProvider>
      </div>
    );
  }

  return (
    <MuiThemeProvider theme={theme}>
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <CssBaseline />
        {children}
      </SnackbarProvider>
    </MuiThemeProvider>
  );
}
