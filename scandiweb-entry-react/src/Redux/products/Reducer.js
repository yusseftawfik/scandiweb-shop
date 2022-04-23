import * as actionTypes from "./Types";
import useProducts

const products = [
	{
		id: "huarache-x-stussy-le",
		name: "Nike Air Huarache Le",
		gallery: [
			"https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087",
			"https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_1_720x.jpg?v=1612816087"
		],
		price: {
			amount: 144.69,
			currency: {
				label: "USD",
				symbol: "$"
			}
		},
		attributes: {
			id: "Size",
			name: "Size",
			type: "text",
			items: [
				{ displayValue: '40', value: '40', id: '40' },
				{ displayValue: '41', value: '41', id: '41' },
				{ displayValue: '42', value: '42', id: '42' },
				{ displayValue: '43', value: '43', id: '43' }
			]
		}
	},
	{
		id: "jacket-canada-goosee",
		name: "Jacket",
		gallery: [
			"https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016105/product-image/2409L_61.jpg",
			"https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_1_720x.jpg?v=1612816087"
		],
		price: {
			amount: 200,
			currency: {
				label: "USD",
				symbol: "$"
			}
		},
		attributes: {
			id: "Size",
			name: "Size",
			type: "text",
			items: [
				{ displayValue: 'M', value: '40', id: '40' },
				{ displayValue: 'L', value: '41', id: '41' },
			]
		}
	}
];
// const category = "";

const INITIAL_STATE = {
	data: products,
	cart: JSON.parse(localStorage.getItem("Cart")) || [],
	currentItem: null,
	currency: JSON.parse(localStorage.getItem("Currency")) || 'USD',
	// category: JSON.parse(localStorage.getItem("Category")) || "all",
	category: "",
};

const productReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case actionTypes.ADD_TO_CART:
			const item = state.data.find((item) => item.id === action.payload.id);
			const inCart = state.cart.find((item) =>
				item.id === action.payload.id ? true : false
			);
			return {
				...state,
				cart: inCart
					? state.cart.map((item) =>
						item.id === action.payload.id
							? { ...item, qty: +item.qty + 1 }
							: item
					)
					: [...state.cart, { ...item, qty: 1 }]
			}

		case actionTypes.REMOVE_FROM_CART:
			return {
				...state,
				cart: state.cart.filter((item) => item.id !== action.payload.id),
			};

		case actionTypes.ADJUST_QTY:
			return {
				...state,
				cart: state.cart.map((item) =>
					item.id === action.payload.id
						? { ...item, qty: action.payload.qty }
						: item
				),
			};

		case actionTypes.LOAD_CURRENT_ITEMS:
			return {
				...state,
				currentItem: action.payload,
			};

		case actionTypes.CHANGE_CURRENCY:
			return {
				...state,
				currency: action.payload,
			};

		case actionTypes.CHANGE_CATEGORY:
			return {
				...state,
				category: action.payload,
			};

		default:
			return state;
	}
};

export default productReducer;
