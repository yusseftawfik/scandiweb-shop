import { combineReducers } from "redux";
import Reducer from './products/Reducer';


const reducer = combineReducers({
	products: Reducer,
});

export default reducer;