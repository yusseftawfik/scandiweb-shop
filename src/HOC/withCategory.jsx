import React, { Component } from 'react'
import { graphql } from "@apollo/client/react/hoc";
import { gql } from "@apollo/client";

const CATEGOTY_QUERY = gql`
 {
    categories {
      name
      products {
        id
        name
        inStock
        gallery
        category
        brand
        description
        prices {
          amount
          currency {
            label
            symbol
          }
        }
        attributes {
          name
          items {
            displayValue
          }
        }
      }
    }
  }
`;

const withCategory = AnyComponent => {
	class Category extends Component {
		render () {
			return <AnyComponent data={this.props.data} {...this.props} />
		}
	}
	return graphql(CATEGOTY_QUERY)(Category);
}
export default withCategory;