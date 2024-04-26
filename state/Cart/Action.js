import { api } from "@/config/apiConfig";
import {
  ADD_PRODUCT_TO_CART_FAILURE,
  ADD_PRODUCT_TO_CART_REQUEST,
  ADD_PRODUCT_TO_CART_SUCCESS,
  DELETE_PRODUCT_FROM_CART_FAILURE,
  DELETE_PRODUCT_FROM_CART_REQUEST,
  DELETE_PRODUCT_FROM_CART_SUCCESS,
  GET_CART_FAILURE,
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
  UPDATE_PRODUCT_IN_CART_FAILURE,
  UPDATE_PRODUCT_IN_CART_REQUEST,
  UPDATE_PRODUCT_IN_CART_SUCCESS,
  CREATE_ORDER_FAILURE,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  GET_ALL_ORDERS_FAILURE,
  GET_ALL_ORDERS_REQUEST,
  GET_ALL_ORDERS_SUCCESS
} from "./ActionType";
import { toast } from "react-toastify";

export const getCart = (id) => async (dispatch) => {
  dispatch({ type: GET_CART_REQUEST });
  try {
    const { data } = await api.get(`/user/cart/${id}`);

    dispatch({ type: GET_CART_SUCCESS, payload: data[0] });
  } catch (error) {
    dispatch({ type: GET_CART_FAILURE, payload: error.message });
  }
};

export const addProductToCart = (req) => async (dispatch) => {
  dispatch({ type: ADD_PRODUCT_TO_CART_REQUEST });
  try {
    const { data } = await api.post("user/cart", req);
    dispatch({ type: ADD_PRODUCT_TO_CART_SUCCESS, payload: data });
    toast.success("Thêm sản phẩm thành công!");
  } catch (error) {
    dispatch({ type: ADD_PRODUCT_TO_CART_FAILURE, payload: error.message });
  }
};

export const removeProductFromCart = (productId) => async (dispatch) => {
  dispatch({ type: DELETE_PRODUCT_FROM_CART_REQUEST });
  try {
    const { data } = await api.delete(`user/delete-product-cart/${productId}`);
    dispatch({ type: DELETE_PRODUCT_FROM_CART_SUCCESS, payload: data });
    toast.success("Đã xóa sản phẩm khỏi giỏ hàng!");
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FROM_CART_FAILURE,
      payload: error.message,
    });
  }
};

export const updateProductInCart = (req) => async (dispatch) => {
  dispatch({ type: UPDATE_PRODUCT_IN_CART_REQUEST });
  try {
    const { data } = await api.delete(
      `user/update-product-cart/${req.id}/${req.quantity}`
    );
    dispatch({ type: UPDATE_PRODUCT_IN_CART_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: UPDATE_PRODUCT_IN_CART_FAILURE, payload: error.message });
  }
};

function redirect() {
  window.location.href = '/'
}

export const createOrder = (req) => async (dispatch) => {
  dispatch({ type: CREATE_ORDER_REQUEST });

  try {
    const { data } = await api.post(`user/cart/create-order`, req);
    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
    toast.success("Tạo đơn hàng thành công!");
    setTimeout(redirect, 1000)
  } catch (error) {
    dispatch({ type: CREATE_ORDER_FAILURE, payload: error.message });
  }
};

export const getAllOrderOfUser = () => async (dispatch) => {
  dispatch({ type: GET_ALL_ORDERS_REQUEST });
  try {
    const { data } = await api.get("user/carts");
    dispatch({ type: GET_ALL_ORDERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_ALL_ORDERS_FAILURE, payload: error.message });
  }
};
