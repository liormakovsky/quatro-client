import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../redux";
import _ from "lodash";
import Cookies from "js-cookie";
import { FaSpinner } from "react-icons/fa";

const Register = () => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.userReducer);

  const navigate = useNavigate();

  useEffect(() => {
    if (user && localStorage.getItem("user")) {
      navigate("/tnx");
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="loading d-flex justify-content-center align-items-center mt-5">
        <FaSpinner icon="spinner" className="spinner" />
      </div>
    );
  }

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const initialValues = {
    email: "",
    passwordRegister: "",
    passwordConfirmation: "",
    mailAdvertiseCheckbox: false,
    firstName: "",
    lastName: "",
    homeNumber: "",
    address: "",
    entryCode: "",
    apartment: "",
    city: "",
    phone: "",
  };
  const validationSchema = yup.object().shape({
    email: yup.string().email("המייל לא חוקי").required("המייל הינו שדה חובה"),
    passwordRegister: yup
      .string()
      .required("הסיסמה הינה שדה חובה")
      .min(6, "הסיסמה קצרה מדי, הסיסמה חייבת להכיל לפחות 6 תווים"),
    passwordConfirmation: yup
      .string()
      .required("אימות הסיסמה הינו שדה חובה")
      .oneOf(
        [yup.ref("passwordRegister"), null],
        "הסיסמה אינה תואמת לסיסמה המקורית"
      ),
    firstName: yup.string().required("השם הפרטי הינו שדה חובה"),
    lastName: yup.string().required("שם המשפחה הינו שדה חובה"),
    homeNumber: yup
      .number()
      .typeError("הכנס מספרים בלבד")
      .required("מספר הבית הינו שדה חובה"),
    address: yup.string().required("בבקשה הכנס את כתובתך"),
    entryCode: yup.number().typeError("הכנס מספרים בלבד"),
    apartment: yup.number().typeError("הכנס מספרים בלבד"),
    city: yup.string().required("בבקשה הכנס את שם העיר שבה הנך מתגורר"),
    phone: yup
      .string()
      .matches(phoneRegExp, "המספר הטלפון אינו תקין")
      .required("שדה הטלפון הינו שדה חובה"),
  });

  return (
    <>
      <div className="main-container">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            dispatch(signupUser(values));
          }}
        >
          {({ dirty, errors }) => (
            <div id="register-container">
              <div id="sub-register-container">
                <div className="top-register-section">
                  <div className="register-strawberry-section">
                    <img
                      id="register-strawberry-img"
                      src="/png/logo.png"
                      alt=""
                    />
                  </div>
                  <div className="peginate-section">
                    <img id="pegination-img" src="/png/pagination.png" alt="" />
                  </div>
                </div>
                <Form id="registerForm">
                  <div className="client-details">
                    <Link to="/login">
                      <img
                        id="signin-text-img"
                        src="/png/signin-text.png"
                        alt=""
                      />
                    </Link>
                    <img
                      id="client-details-img"
                      src="/png/client-details-text.png"
                      alt=""
                    />
                  </div>

                  {/* email start */}
                  <div className="bigInput">
                    <Field
                      type="email"
                      name="email"
                      id="register-email-input"
                      className="login-input"
                      dir="rtl"
                    />
                    <ErrorMessage
                      name="email"
                      component="span"
                      className="text-danger"
                      dir="rtl"
                    />
                  </div>
                  {/* email end */}

                  {/* password start */}
                  <div className="password-register-section">
                    <div id="validate-password-register-group">
                      <Field
                        type="password"
                        name="passwordConfirmation"
                        id="passwordConfirmation"
                        className="login-input doubleInputs"
                        dir="rtl"
                      />
                      <ErrorMessage
                        name="passwordConfirmation"
                        component="span"
                        className="text-danger"
                        dir="rtl"
                      />
                    </div>

                    <div id="password-register-group">
                      <Field
                        type="password"
                        name="passwordRegister"
                        id="passwordRegister"
                        className="login-input doubleInputs"
                        dir="rtl"
                      />
                      <ErrorMessage
                        name="passwordRegister"
                        component="span"
                        className="text-danger"
                        dir="rtl"
                      />
                    </div>
                  </div>
                  {/* password end */}

                  {/* recive adds start */}
                  <div id="mailAdvertiseSection">
                    <p>אני מאשר/ת קבלת פרסומים במייל</p>
                    <div id="mailAdvertiseCheckboxContainer">
                      <Field
                        type="checkbox"
                        name="mailAdvertiseCheckbox"
                        id="mailAdvertiseCheckbox"
                      />
                    </div>
                  </div>
                  <div id="deliveryDetailsContainer">
                    <img
                      id="deliveryDetailsImg"
                      src="/png/address-title-text.png"
                      alt=""
                    />
                  </div>
                  {/* recive adds end */}

                  {/* First name and last name start */}
                  <div className="doubleSection">
                    <div className="doubleInputStart">
                      <Field
                        type="text"
                        name="lastName"
                        id="lastName"
                        className="login-input doubleInputs"
                        dir="rtl"
                      />
                      <ErrorMessage
                        name="lastName"
                        component="span"
                        className="text-danger"
                        dir="rtl"
                      />
                    </div>

                    <div className="doubleInputEnd">
                      <Field
                        type="text"
                        name="firstName"
                        id="firstName"
                        className="login-input doubleInputs"
                        dir="rtl"
                      />
                      <ErrorMessage
                        name="firstName"
                        component="span"
                        className="text-danger"
                        dir="rtl"
                      />
                    </div>
                  </div>
                  {/* First name and last name end */}

                  {/* Home and address start */}
                  <div className="doubleSection">
                    <div className="doubleInputStart">
                      <Field
                        type="text"
                        name="homeNumber"
                        id="homeNumber"
                        className="login-input doubleInputs"
                        dir="rtl"
                      />
                      <ErrorMessage
                        name="homeNumber"
                        component="span"
                        className="text-danger"
                        dir="rtl"
                      />
                    </div>

                    <div className="doubleInputEnd">
                      <Field
                        type="text"
                        name="address"
                        id="address"
                        className="login-input doubleInputs"
                        dir="rtl"
                      />
                      <ErrorMessage
                        name="address"
                        component="span"
                        className="text-danger"
                        dir="rtl"
                      />
                    </div>
                  </div>
                  {/* Home and address end */}

                  {/* code,apartment and city start */}
                  <div className="doubleSection">
                    <div className="smallInput">
                      <Field
                        type="text"
                        name="entryCode"
                        id="entryCode"
                        className="login-input doubleInputs"
                        dir="rtl"
                      />
                      <ErrorMessage
                        name="entryCode"
                        component="span"
                        className="text-danger"
                        dir="rtl"
                      />
                    </div>

                    <div className="smallInput">
                      <Field
                        type="text"
                        name="apartment"
                        id="apartment"
                        className="login-input doubleInputs"
                        dir="rtl"
                      />
                      <ErrorMessage
                        name="apartment"
                        component="span"
                        className="text-danger"
                        dir="rtl"
                      />
                    </div>

                    <div className="mediumInput">
                      <Field
                        type="text"
                        name="city"
                        id="city"
                        className="login-input doubleInputs"
                        dir="rtl"
                      />
                      <ErrorMessage
                        name="city"
                        component="span"
                        className="text-danger"
                        dir="rtl"
                      />
                    </div>
                  </div>
                  {/* code,apartment and city end */}

                  {/*phone start */}
                  <div className="bigInput" id="phoneSection">
                    <Field
                      type="phone"
                      name="phone"
                      id="phone"
                      className="login-input"
                      dir="rtl"
                    />
                    <ErrorMessage
                      name="phone"
                      component="span"
                      className="text-danger"
                      dir="rtl"
                    />
                  </div>
                  {/*phone end */}

                  {/* Submit section */}
                  <div className="doubleSection" id="submitSection">
                    <div className="doubleInputstart">
                      <button
                        type="submit"
                        id="registerSubmit"
                        disabled={isLoading || !_.isEmpty(errors) || !dirty}
                      >
                        המשך לאפשרויות משלוח
                      </button>
                    </div>

                    <div className="doubleInputEnd">
                      <img
                        id="backToCaryImg"
                        src="/png/back-to-cart.png"
                        alt=""
                      />
                    </div>
                  </div>
                  {/* submit section end */}
                </Form>
              </div>
            </div>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Register;
