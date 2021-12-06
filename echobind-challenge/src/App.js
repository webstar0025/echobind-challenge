import React from "react";

import Routes from "routes";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "./utils/apollo";

const App = () => (
  <ApolloProvider client={ApolloClient}>
    <Routes />
  </ApolloProvider>
);

export default App;
