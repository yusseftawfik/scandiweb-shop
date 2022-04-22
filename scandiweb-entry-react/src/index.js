import React from "react";
import ReactDOM from "react-dom/client";
import { HttpLink, ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from './Redux/store';
import App from "./Components/App";
import Cart from "./Components/Cart/Cart";
import PDP from './Components/Products/PDP';
import NotFound from './Components/NotFound';
import Checkout from "./Components/Cart/Checkout";
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
  <ApolloProvider client={client}>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<App />} />
          <Route path="cart" element={<Cart />} />
          <Route path="/product/:id" element={<PDP />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </ApolloProvider>
);



