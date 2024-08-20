import { useEffect, useState } from "react";
// import useGet from './useGet';
import initialState from "../initialState";
import {useGetProducts} from './usePetitions';
// import { postCart } from '../api';
// import { getData } from '../api';

const useInitialState = () => {
  const { data: products, loading: loadingProducts, error: errorProducts } = useGetProducts();

  const [state, setState] = useState(initialState);
  
  useEffect(() => {
    if (products?.body?.Response) {
      setState({ ...initialState, products: products?.body?.Response });
    }
  }, [products]);

  const removeCart = () => {
    setState({ ...state, cart: [] });
  };

  const addToCart = (payload) => {
    const body = {
      id: payload.id,
      nombre:payload.nombre,
      price:payload.price,
      count: payload?.cantidad || payload.count,
    }
    setState({ ...state, cart: [...state.cart, body] });
  };

  const removeFromCart = (payload) => {
    setState({
      ...state,
      cart: state.cart.filter((items) => items.id !== payload.id),
    });
  };

  const addToBuyer = (payload) => {
    setState({ ...state, buyer:  payload });
  };

  const deleteFromCart = (payload) => {
    const idCart = state.cart.filter(item => item.id === payload.id);
    const maxCount = idCart.reduce((max, item) => {
      return item.count > max ? item.count : max;
    }, 0);

    setState({
      ...state,
      cart: state.cart.filter((item) => (!(item.id === payload.id && item.count == maxCount))),
    });
  };

  return {
    addToCart,
    removeFromCart,
    deleteFromCart,
    state,
    addToBuyer,
    removeCart,
  };
};
export default useInitialState;
