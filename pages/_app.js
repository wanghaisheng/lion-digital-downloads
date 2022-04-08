import React, { useState, useEffect } from "react";
import App from "next/app";
import Router from "next/router";

import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';

import { ThemeProvider, Layout } from '@template'
import UserProvider from "@user";

const MyApp = ({ Component, pageProps }) => {
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
      const start = () => setIsLoading(true);
      const end = () => setIsLoading(false);

      Router.events.on("routeChangeStart", start);
      Router.events.on("routeChangeComplete", end);
      Router.events.on("routeChangeError", end);
      return () => {
        Router.events.off("routeChangeStart", start);
        Router.events.off("routeChangeComplete", end);
        Router.events.off("routeChangeError", end);
      };
    }, []);

    return (
        <React.Fragment>
          <MantineProvider theme={ThemeProvider}>
            <UserProvider>
              <Layout>
                <NotificationsProvider>
                  {isLoading ? (
                    <div>Loading...</div>
                  ) : (
                    <Component {...pageProps} />
                  )}
                </NotificationsProvider>
              </Layout>
            </UserProvider>
          </MantineProvider>
        </React.Fragment>
    );
}

MyApp.getInitialProps = async (appContext) => {
    const appProps = await App.getInitialProps(appContext);
    return {
      ...appProps 
    };
};

export default MyApp;