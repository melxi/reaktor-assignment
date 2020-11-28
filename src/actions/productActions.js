import { fetchAvalability, fetchCategory } from '../Api';
import { GET_PRODUCTS, UPDATE_PRODUCTS } from './types';

export const getProducts = (category) => async (dispatch, getState) => {
  try {
    const data = await fetchCategory(category);

    dispatch({
      type: GET_PRODUCTS,
      payload: data
    })

    dispatch(updateProducts());
  } catch (error) {
    console.log(error)
  }
}

export const updateProducts = () => async (dispatch, getState) => {
  let data = [];

  try {
    const { products: { products} } = getState();
    const productsInStock = window.localStorage.getItem('productsInStock');

    if (productsInStock) {
      data = JSON.parse(productsInStock).flat();
    } else {
      const promises = [...new Set(products.map(product => product.manufacturer))].map(manufacturer => {
        return fetchAvalability(manufacturer);
      })

      const availability = await Promise.all(promises);

      for (let i = 0; i < availability.length; i++) {
        if (availability[i] === "[]") {
          availability.splice(i, 1);
        } else {
          data = availability.flat();
          window.localStorage.setItem('productsInStock', JSON.stringify(data));
        }
      }
    }

    dispatch({
      type: UPDATE_PRODUCTS,
      payload: data
    })

  } catch (error) {
    console.log('error in actions availability', error)
  }
}