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

const client = new ApolloClient({
  link: Database,
  cache: new InMemoryCache()
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Provider>
);