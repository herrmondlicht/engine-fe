import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import { SWRConfig } from "swr";

import { CombinedFormsProvider, NotificationProvider } from "context";

const Providers = ({ children, route, path }) => (
  <SWRConfig value={{ provider: () => new Map(), dedupingInterval: 0 }}>
    <NotificationProvider>
      <CombinedFormsProvider>
        <MemoryRouter initialEntries={[route]}>
          <Route path={path}>{children}</Route>
        </MemoryRouter>
      </CombinedFormsProvider>
    </NotificationProvider>
  </SWRConfig>
);

export const renderWithProviders = (ui, { route = "/", path = "/" } = {}) =>
  render(ui, {
    wrapper: ({ children }) => (
      <Providers route={route} path={path}>
        {children}
      </Providers>
    ),
  });
