import { api } from "@/config/apiConfig";
import {
  ADD_BRAND_FAILURE,
  ADD_BRAND_REQUEST,
  ADD_BRAND_SUCCESS,
  ADD_NEW_PRODUCT_REQUEST,
  ADD_NEW_PRODUCT_FAILURE,
  ADD_NEW_PRODUCT_SUCCESS,
  ADD_CATEGORY_FAILURE,
  ADD_CATEGORY_REQUEST,
  ADD_CATEGORY_SUCCESS,
  DELETE_BRAND_FAILURE,
  DELETE_BRAND_REQUEST,
  DELETE_BRAND_SUCCESS,
  DELETE_CATEGORY_FAILURE,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  GET_ALL_USER_FAILURE,
  GET_ALL_USER_SUCCESS,
  GET_ALL_USER_REQUEST,
  UPLOAD_IMAGE_FAILURE,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_REQUEST,
  DELETE_IMAGE_REQUEST,
  DELETE_IMAGE_SUCCESS,
  DELETE_IMAGE_FAILURE,
  DELETE_PRODUCT_FAILURE,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  CHANGE_ROLE_REQUEST,
  CHANGE_ROLE_SUCCESS,
  CHANGE_ROLE_FAILURE,
  SET_IMAGE_NULL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILURE,
  GET_ALL_ORDERS_REQUEST,
  GET_ALL_ORDERS_SUCCESS,
  GET_ALL_ORDERS_FAILURE,
  UPDATE_BRAND_REQUEST,
  UPDATE_BRAND_SUCCESS,
  UPDATE_BRAND_FAILURE,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAILURE,
  UPDATE_ORDER_STATUS_REQUEST,
  UPDATE_ORDER_STATUS_SUCCESS,
  UPDATE_ORDER_STATUS_FAILURE,
} from "./ActionType";
import { toast } from "react-toastify";

export const addNewBrand = (req) => async (dispatch) => {
  dispatch({ type: ADD_BRAND_REQUEST });
  try {
    const { data } = await api.post("/brand", req);
    dispatch({ type: ADD_BRAND_SUCCESS, payload: data });
    toast.success("Thêm nhãn hàng thành công");
    setTimeout(refresh, 1000);
  } catch (e) {
    dispatch({ type: ADD_BRAND_FAILURE, payload: e });
    toast.error(e?.response?.data.message);
  }
};

export const updateBrand = (req) => async (dispatch) => {
  const brand_T = { title: `${req.title}` };
  dispatch({ type: UPDATE_BRAND_REQUEST });
  try {
    const { data } = await api.put(`/brand/${req.id}`, brand_T);
    dispatch({ type: UPDATE_BRAND_SUCCESS, payload: data });
    toast.success("Sửa thành công");
    setTimeout(refresh, 1000);
  } catch (e) {
    dispatch({ type: UPDATE_BRAND_FAILURE, payload: e.message });
    toast.error(e?.response?.data.message);
  }
};

export const deleteBrand = (brandId) => async (dispatch) => {
  dispatch({ type: DELETE_BRAND_REQUEST });
  try {
    const { data } = api.delete(`/brand/${brandId}`);
    dispatch({ type: DELETE_BRAND_SUCCESS, payload: data });
    toast.success("Xóa thành công");
    setTimeout(refresh, 1000);
  } catch (e) {
    dispatch({ type: DELETE_BRAND_FAILURE, payload: e.message });
    toast.error(e?.response?.data.message);
  }
};

export const addNewCategory = (req) => async (dispatch) => {
  req.image = req.image[0];
  dispatch({ type: ADD_CATEGORY_REQUEST });
  try {
    const { data } = await api.post("/prodcategory", req);

    dispatch({ type: ADD_CATEGORY_SUCCESS, payload: data });
    toast.success("Thêm thành công");
    setTimeout(refresh, 1000);
  } catch (e) {
    dispatch({ type: ADD_CATEGORY_FAILURE, payload: e.message });
    toast.error(e?.response?.data.message);
  }
};

export const updateCategory = (req) => async (dispatch) => {
  req.image = req.image[0].image
  const { id, ...data_t } = req;
  dispatch({ type: UPDATE_CATEGORY_REQUEST });
  try {
    const { data } = await api.put(`/prodcategory/${req.id}`, data_t);
    dispatch({ type: UPDATE_CATEGORY_SUCCESS, payload: data });
    toast.success("Sửa thành công");
    setTimeout(refresh, 1000);
  } catch (e) {
    dispatch({ type: UPDATE_CATEGORY_FAILURE, payload: e });
    toast.error(e?.response?.data.message);
  }
};

export const deleteCategory = (categoryId) => async (dispatch) => {
  dispatch({ type: DELETE_CATEGORY_REQUEST });
  try {
    const { data } = api.delete(`/prodcategory/${categoryId}`);
    dispatch({ type: DELETE_CATEGORY_SUCCESS, payload: data });
    toast.success("Xóa thành công");
    setTimeout(refresh, 1000);
  } catch (e) {
    dispatch({ type: DELETE_CATEGORY_FAILURE, payload: e.message });
    toast.error(e?.response?.data.message);
  }
};

export const getAllUser = () => async (dispatch) => {
  dispatch({ type: GET_ALL_USER_REQUEST });
  try {
    const { data } = await api.get(`user/all-user`);
    dispatch({ type: GET_ALL_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_ALL_USER_FAILURE, payload: error.message });
  }
};

export const updateRole = (req) => async (dispatch) => {
  const role_T = { role: `${req.role}` };
  dispatch({ type: CHANGE_ROLE_REQUEST });
  try {
    const { data } = await api.put(`/user/role/${req.id}`, role_T);
    dispatch({ type: CHANGE_ROLE_SUCCESS, payload: data });
    toast.success("Sửa thành công");
    setTimeout(refresh, 1000);
  } catch (e) {
    dispatch({ type: CHANGE_ROLE_FAILURE, payload: e.message });
    toast.error(e?.response?.data.message);
  }
};

export const uploadImg = (req) => async (dispatch) => {
  var formData = new FormData();
  req.map((i) => formData.append("images", i));
  console.log(req);
  console.log(...formData);
  dispatch({ type: UPLOAD_IMAGE_REQUEST });
  try {
    const { data } = await api.post(`/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    });
    dispatch({ type: UPLOAD_IMAGE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: UPLOAD_IMAGE_FAILURE, payload: error.message });
    console.log(error);
  }
};

export const deleteImg = (imgId) => async (dispatch) => {
  dispatch({ type: DELETE_IMAGE_REQUEST });
  try {
    const { data } = await api.put(`/upload/delete-img/${imgId}`);
    dispatch({ type: DELETE_IMAGE_SUCCESS, payload: data });
  } catch (e) {
    dispatch({ type: DELETE_IMAGE_FAILURE, payload: e.message });
    alert(e);
  }
};

export const handleSetImagesToNull = () => async (dispatch) => {
  dispatch({ type: SET_IMAGE_NULL, payload: null });
};

export const deleteProduct = (productId) => async (dispatch) => {
  dispatch({ type: DELETE_PRODUCT_REQUEST });
  try {
    const { data } = api.delete(`/product/${productId}`);
    toast.success("Xóa thành công");
    setTimeout(refresh, 1000);
    dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: data });
  } catch (e) {
    dispatch({ type: DELETE_PRODUCT_FAILURE, payload: e.message });
    toast.error(e?.response?.data.message);
  }
};

export const addNewProduct = (req) => async (dispatch) => {
  console.log(req);
  dispatch({ type: ADD_NEW_PRODUCT_REQUEST });
  try {
    const { data } = await api.post("/product", req);
    dispatch({ type: ADD_NEW_PRODUCT_SUCCESS, payload: data });
    toast.success("Thêm thành công");
    setTimeout(refresh, 1000);
  } catch (e) {
    dispatch({ type: ADD_NEW_PRODUCT_FAILURE, payload: e.message });
    toast.error(e?.response?.data.message);
  }
};

export const updateProduct = (req) => async (dispatch) => {
  const { ID, ...data_t } = req;
  dispatch({ type: UPDATE_PRODUCT_REQUEST });
  try {
    const { data } = await api.put(`/product/${req.ID}`, data_t);
    dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: data });
    toast.success("Sửa thành công");
  } catch (e) {
    dispatch({ type: UPDATE_PRODUCT_FAILURE, payload: e });
    toast.error(e?.response?.data.message);
  }
};

export const getAllOrders = () => async (dispatch) => {
  dispatch({ type: GET_ALL_ORDERS_REQUEST });
  try {
    const { data } = await api.get(`/user/all-orders`);
    dispatch({ type: GET_ALL_ORDERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_ALL_ORDERS_FAILURE, payload: error.message });
  }
};

export const updateOrderStatus = (req) => async (dispatch) => {
  const status_T = { status: `${req.status}` };
  dispatch({ type: UPDATE_ORDER_STATUS_REQUEST });
  try {
    const { data } = await api.put(`/user/order/update/${req.id}`, status_T);
    dispatch({ type: UPDATE_ORDER_STATUS_SUCCESS, payload: data });
    toast.success("Sửa thành công");
    setTimeout(refresh, 1000);
  } catch (e) {
    dispatch({ type: UPDATE_ORDER_STATUS_FAILURE, payload: e.message });
    toast.error(e?.response?.data.message);
  }
};
