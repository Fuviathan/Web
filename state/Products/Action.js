import axios from "axios";
import {
  GET_ALL_BRAND_FAILURE,
  GET_ALL_BRAND_REQUEST,
  GET_ALL_BRAND_SUCCESS,
  GET_ALL_CATEGORY_FAILURE,
  GET_ALL_CATEGORY_REQUEST,
  GET_ALL_CATEGORY_SUCCESS,
  GET_ALL_COLOR_FAILURE,
  GET_ALL_COLOR_REQUEST,
  GET_ALL_COLOR_SUCCESS,
  GET_PRODUCTS_BY_FILTER_FAILURE,
  GET_PRODUCTS_BY_FILTER_REQUEST,
  GET_PRODUCTS_BY_FILTER_SUCCESS,
  GET_PRODUCTS_FAILURE,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_SINGLE_PRODUCTS_FAILURE,
  GET_SINGLE_PRODUCTS_REQUEST,
  GET_SINGLE_PRODUCTS_SUCCESS,
  GET_CATEGORY_COUNT_FAILURE,
  GET_CATEGORY_COUNT_REQUEST,
  GET_CATEGORY_COUNT_SUCCESS,
} from "./ActionType";
import { API_BASE_URL } from "@/config/apiConfig";

export const getProducts = () => async (dispatch) => {
  dispatch({ type: GET_PRODUCTS_REQUEST });

  try {
    const { data } = await axios.get(`${API_BASE_URL}/admin/product/get-all`);
    dispatch({ type: GET_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_PRODUCTS_FAILURE, payload: error.message });
  }
};

export const getProductByFilter = (req) => async (dispatch) => {
  dispatch({ type: GET_PRODUCTS_BY_FILTER_REQUEST });
  try {
    const { data } = await axios.get(
      `${API_BASE_URL}product?${req?.brand ? `brand=${req?.brand}&&` : ""}${
        req?.category ? `category=${req?.category}&&` : ""
      }${req?.color ? `color=${req?.color}&&` : ""}${
        req?.minPrice ? `price[gte]=${req?.minPrice}&&` : ""
      }${req?.maxPrice ? `price[lte]=${req?.maxPrice}&&` : ""}${
        req?.sort ? `sort=${req?.sort}&&` : ""
      }${req?.tag ? `tags=${req?.tag.toLowerCase()}&&` : ""}${
        req?.limit ? `limit=${req?.limit}&&` : ""
      }`,
    );
    dispatch({ type: GET_PRODUCTS_BY_FILTER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_PRODUCTS_BY_FILTER_FAILURE, payload: error.message });
  }
};

export const getProductByColor = () => async (dispatch) => {
  dispatch({ type: GET_ALL_COLOR_REQUEST });

  try {
    const { data } = await axios.get(`${API_BASE_URL}product/color`);
    dispatch({ type: GET_ALL_COLOR_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_ALL_COLOR_FAILURE, payload: error.message });
  }
};

export const getProductByBrand = () => async (dispatch) => {
  dispatch({ type: GET_ALL_BRAND_REQUEST });

  try {
    const { data } = await axios.get(`${API_BASE_URL}brand`);
    dispatch({ type: GET_ALL_BRAND_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_ALL_BRAND_FAILURE, payload: error.message });
  }
};

export const getProductByCategory = () => async (dispatch) => {
  dispatch({ type: GET_ALL_CATEGORY_REQUEST });

  try {
    const { data } = await axios.get(`${API_BASE_URL}prodcategory`);
    dispatch({ type: GET_ALL_CATEGORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_ALL_CATEGORY_FAILURE, payload: error.message });
  }
};

export const getSingleProduct = (id) => async (dispatch) => {
  dispatch({ type: GET_SINGLE_PRODUCTS_REQUEST });
  try {
    const { data } = await axios.get(`${API_BASE_URL}product/${id}`);
    console.log(data);
    dispatch({ type: GET_SINGLE_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_SINGLE_PRODUCTS_FAILURE, payload: error.message });
  }
};

export const getCategoryCount = () => async (dispatch) => {
  dispatch({ type: GET_CATEGORY_COUNT_REQUEST });
  try {
    const { data } = await axios.get(`${API_BASE_URL}prodcategory/count`);
    dispatch({ type: GET_CATEGORY_COUNT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_CATEGORY_COUNT_FAILURE, payload: error.message });
  }
};
