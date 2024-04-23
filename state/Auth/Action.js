import axios from "axios";
import {
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "./ActionType";
import { API_BASE_URL } from "@/config/apiConfig";
import { toast } from "react-toastify";

function redirect() {
  window.location.href = '/login'
}

export const register = (userData) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });

  try {
    const response = await axios.post(`${API_BASE_URL}user/register`, userData);
    const user = response.data;
    dispatch({ type: REGISTER_SUCCESS, payload: user });
    toast.success("Đăng ký thành công!");
    setTimeout(redirect, 1000)
  } catch (error) {
    dispatch({ type: REGISTER_FAILURE, payload: error });
    toast.error(error?.response?.data.message);
  }
};

export const login = (userData) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });

  try {
    const response = await axios.post(`${API_BASE_URL}user/login`, userData);
    const user = response.data;

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }

    toast.success("Đăng nhập thành công!");
    window.location = "/product";
    dispatch({ type: LOGIN_SUCCESS, payload: user });
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error });
    toast.error("Sai tài khoản hoặc mặt khẩu");
  }
};

export const logout = () => (dispatch) => {
  toast.error("Bạn đã đăng xuất!");
  dispatch({ type: LOGOUT, payload: null });
  localStorage.clear();
};

const getUserRequest = () => ({ type: GET_USER_REQUEST });
const getUserSuccess = (user) => ({ type: GET_USER_SUCCESS, payload: user });
const getUserFailure = (error) => ({ type: GET_USER_FAILURE, payload: error });

export const getUser = (jwt) => async (dispatch) => {
  dispatch(getUserRequest());

  try {
    const response = await axios.get(`${API_BASE_URL}/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    const user = response.data;

    dispatch(getUserSuccess(user));
  } catch (error) {
    dispatch(getUserFailure(error.message));
  }
};
