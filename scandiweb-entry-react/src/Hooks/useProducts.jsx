import { useQuery, gql } from "@apollo/client";

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
const useProducts = () => {
    const { data, error, loading } = useQuery(PRODDUCT_QUERY);
    return {
        data,
        error,
        loading,
    };
};
export default useProducts;
