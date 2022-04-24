import React from "react";
import ReactDOM from "react-dom/client";
import { HttpLink, ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Provider } from "react-redux";
import store from './Redux/store';
import App from "./Components/App";
import 'normalize.css';
import "./Styles/index.scss";

const Database = new HttpLink({
  uri: "http://localhost:4000/graphql",
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: Database,
  cache
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>
);
