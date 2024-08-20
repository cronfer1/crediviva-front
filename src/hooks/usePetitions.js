import useGet from './useGet';
import { postData,getData,putData } from '../api';

export const useGetProducts = () =>  useGet('list_products');

export const postCart = async (body) => await postData('cart', body);

export const getCart = async () => await getData('cart');

export const putCart = async (body) => await putData('cart',body);