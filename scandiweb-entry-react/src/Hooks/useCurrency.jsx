import { useQuery, gql } from "@apollo/client";

const CURRENCY_QUERY = gql`
    {
    currencies {
            label
            symbol
    }
    }
`;

const useCurrency = () => {
	const { data, error, loading } = useQuery(CURRENCY_QUERY);
	return {
		data,
		error,
		loading,
	};
};

export default useCurrency;
