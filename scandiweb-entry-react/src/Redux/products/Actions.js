import * as actionTypes from './Types';

export const setData = (data) => {
	return {
		type: actionTypes.SET_DATA,
		payload: {
			data: data
		}
	}
}

export const setCategory = (value) => {
	return {
		type: actionTypes.SET_CATEGORY,
		payload: {
			data: value
		}
	}
}

export const addToCart = (itemID) => {
	return {
		type: actionTypes.ADD_TO_CART,
		payload: {
			id: itemID
		}
	}
}

export const removeFromCart = (itemID) => {
	return {
		type: actionTypes.REMOVE_FROM_CART,
		payload: {
			id: itemID
		}
	}
}

export const adjustQty = (itemID, value) => {
	return {
		type: actionTypes.ADJUST_QTY,
		payload: {
			id: itemID,
			qty: value
		}
	}
}

export const selectAttribute = (itemID, attribute, value) => {
	return {
		type: actionTypes.ADJUST_ATTRIBUTES,
		payload: {
			id: itemID,
			selectedAttributes: {
				
			}
		}
	}
}

export const loadCurrentItems = (item) => {
	return {
		type: actionTypes.LOAD_CURRENT_ITEMS,
		payload: item
	}
}

export const changeCurrency = (label) => {
	return {
		type: actionTypes.CHANGE_CURRENCY,
		payload: label
	}
}
export const changeCategory = (name) => {
	return {
		type: actionTypes.CHANGE_CATEGORY,
		payload: name
	}
}

// item: {
// 	id: item.id,
// 		name: item.name,
// 			// inStock: item.inStock,
// 			// gallery: item.gallery,
// 			category: item.category,
// 				brand: item.brand,
// 					description: item.description,
// 						price: item.price,
// 				// prices: {
// 				// 	amount: item.prices.amount,
// 				// 	currency: {
// 				// 		label: item.prices.currency.label,
// 				// 		symbol: item.prices.currency.symbol,
// 				// 	}
// 				// },
// 				// attributes: {
// 				// 	id: item.attributes.id,
// 				// 	name: item.attributes.name,
// 				// 	type: item.attributes.type,
// 				// 	items: {
// 				// 		displayValue: item.attributes.items.displayValue,
// 				// 		value: item.attributes.items.value,
// 				// 		id: item.attributes.items.id,
// 				// 	}
// 				// }
// 			}