import { useQuery, gql } from "@apollo/client";

const CATEGOTY_QUERY = gql`
    {
    categories {
        name
        }
    }
`;

const useCategory = (Component) => {
	const { data } = useQuery(CATEGOTY_QUERY);
	return {
		data
	};
};

export default useCategory;