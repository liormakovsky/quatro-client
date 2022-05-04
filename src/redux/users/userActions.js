import axios from "axios";

import {
  SIGNUP_USER_BEGIN,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  LOGOUT_USER,
} from "./userTypes";

const user = localStorage.getItem("user");

export const initialState = {
  isLoading: false,
  //user: user ? JSON.parse(user) : null,
  error: "",
};

axios.defaults.baseURL = "http://localhost:8181/quatro/server";
axios.defaults.headers.post["Accept"] = "application/json";
axios.defaults.headers.post["Content-Type"] = "application/json";

const addUserToLocalStorage = ({ currentUser }) => {
  localStorage.setItem("user", JSON.stringify(currentUser));
};

const removeUserFromLocalStorage = () => {
  localStorage.removeItem("user");
};

export const signupUser = (user) => {
  return async (dispatch) => {
    dispatch({ type: SIGNUP_USER_BEGIN });
    try {
      const { data } = await axios.post("/signup.php", user);
      if (data !== undefined) {
        const currentUser = data.data;
        dispatch({
          type: SIGNUP_USER_SUCCESS,
          payload: { currentUser },
        });
        addUserToLocalStorage({ currentUser });
      } else {
        dispatch({
          type: SIGNUP_USER_ERROR,
        });
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
};

export const loginUser = (user) => {
  return async (dispatch) => {
    dispatch({ type: LOGIN_USER_BEGIN });
    const { email, password } = user;
    try {
      const { data } = await axios.post(`signin.php`, {
        email,
        password,
      });
      if (data !== undefined) {
        const currentUser = data.data;
        dispatch({
          type: LOGIN_USER_SUCCESS,
          payload: { currentUser },
        });
        addUserToLocalStorage({ currentUser });
      } else {
        dispatch({
          type: LOGIN_USER_ERROR,
        });
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
};

export const logoutUser = (dispatch) => {
  return (dispatch) => {
    axios
      .post("api/v1/auth/logout")
      .then(function (response) {
        dispatch({ type: LOGOUT_USER });
        removeUserFromLocalStorage();
      })
      .catch(function (error) {
        console.log(error.response.data.message);
      });
  };
};
