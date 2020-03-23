import React from "react";
import App from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { SnackbarProvider } from "notistack";

import theme from "../src/theme";
import Snackbar from "../src/components/Snackbar";
import withReduxStore from "../src/lib/with-redux-store";

// console.dir(withReduxStore);

class MyApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentNode!.removeChild(jssStyles);
    }
  }

  render() {
    // @ts-ignore
    const { Component, pageProps, reduxStore } = this.props;

    return (
      <Provider store={reduxStore}>
        <Head>
          <title>My page</title>
        </Head>
        <ThemeProvider theme={theme}>
          <SnackbarProvider>
            <Snackbar />
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Component {...pageProps} />
          </SnackbarProvider>
        </ThemeProvider>
      </Provider>
    );
  }
}

export default withReduxStore(MyApp);
