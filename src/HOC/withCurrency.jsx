import React, { Component } from "react";
import { graphql } from "@apollo/client/react/hoc";
import { gql } from "@apollo/client";

const CURRENCY_QUERY = gql`
  {
    currencies {
      label
      symbol
    }
  }
`;

const withCurrency = (AnyComponent) => {
	class Currency extends Component {
		render () {
			return <AnyComponent data={this.props.data} {...this.props} />;
		}
	}
	return graphql(CURRENCY_QUERY)(Currency);
};
export default withCurrency;
