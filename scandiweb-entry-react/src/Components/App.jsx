import React, { Component } from 'react';
import Navbar from './Navbar/Navbar';
import PLP from './Products/PLP';

export default class App extends Component {
  render () {
    return (
      <>
        <Navbar />
        <PLP />
      </>
    )
  }
}