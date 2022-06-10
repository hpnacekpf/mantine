import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Services } from "./pages/Services/Services";

import "./App.css";
import { useAuth } from "react-oidc-context";
import { useState } from 'react';
import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';

import axios from "axios";
import { Scheduler } from "./pages/Scheduler";
import CreateServices from "./pages/Services/CreateServices";
import { ServiceList } from "./pages/Services/ServiceList";
import { UpdateService } from "./pages/Services/UpdateService";
import { ModalsProvider } from "@mantine/modals";
import Categories from "./pages/Services/Categories";

function App() {
  const auth = useAuth();
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  if (auth.user) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `${auth.user.token_type} ${auth.user.access_token}`;
  }

  switch (auth.activeNavigator) {
    case "signinSilent":
      return <div>Signing you in...</div>;
    case "signoutRedirect":
      return <div>Signing you out...</div>;
  }

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return (
      <div>
        Oops... {auth.error.message}
        <button onClick={() => void auth.signinRedirect()}>Log in</button>
      </div>
    );
  }

  if (auth.isAuthenticated && auth.user) {
    return (
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <NotificationsProvider>
          <ModalsProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route path="servicesList" element={<ServiceList />} />
                  <Route path="services" element={<Services />} />
                  <Route path="services/add" element={<CreateServices />} />
                  <Route path="services/update/:id" element={<UpdateService />} />
                  <Route path="services/categories" element={<Categories />} />
                  <Route path="scheduler" element={<Scheduler />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </ModalsProvider>
        </NotificationsProvider>
      </ColorSchemeProvider>
    );
  }

  return <button onClick={() => void auth.signinRedirect()}>Log in</button>;
}

export default App;
