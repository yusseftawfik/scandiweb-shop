import { useQuery, gql } from "@apollo/client";
import { connect } from 'react-redux';
import { setData } from '../../Redux/products/Actions';

const PRODDUCT_QUERY = gql`
{
    category {
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

const useProducts = ({ setData }) => {
    const { data, error, loading } = useQuery(PRODDUCT_QUERY, {
        onCompleted: (data) => setData(data.category.products)
    });
    return {
        data,
        error,
        loading,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setData: (data) => dispatch(setData(data))
    }
}
export default connect(null, mapDispatchToProps)(useProducts);