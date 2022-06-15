import React, { Component } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import Cart from "../Components/Cart/Cart";
import PDP from '../Components/Products/PDP';
import NotFound from '../Components/NotFound';
import Checkout from "../Components/Cart/Checkout";
import PLP from '../Components/Products/PLP';

class App extends Component {
  render () {
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<PLP />} />
            <Route exact path="/scandiweb-shop" element={<PLP />} />
            {
              !this.props.cart.length
                ?
                <Route path="cart" element={<Navigate to="/" />} />
                :
                <Route path="cart" element={<Cart />} />
            }
            {
              !this.props.currentItem
                ?
                <Route path="/scandiweb-shop/:category/product/:id" element={<Navigate to="/" />} />
                :
                <Route path="/scandiweb-shop/:category/product/:id" element={<PDP />} />
            }
            <Route path="checkout" element={<Checkout />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentItem: state.products.currentItem,
    cart: state.products.cart,
  }
};

export default connect(mapStateToProps)(App);
