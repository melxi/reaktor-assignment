import { GET_PRODUCTS, UPDATE_PRODUCTS } from '../actions/types';

const initialState = {
  products: [],
  isLoading: true
}

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        isLoading: false
      }
    case UPDATE_PRODUCTS:
      return {
        ...state,
        products: state.products.map(obj => Object.assign(obj, action.payload.find(o => o.id.toLowerCase() === obj.id))),
        isLoading: false
      }
    default:
      return state
  }
}

export default productReducer;