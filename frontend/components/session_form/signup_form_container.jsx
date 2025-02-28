import { connect } from "react-redux";
import React from "react";
import { Link } from "react-router-dom";
import { signup } from "../../actions/session_actions";
import SignupForm from "./signup_form";

const mapStateToProps = ({ errors }) => {
  return {
    errors: errors.session,
    formType: "signup",
    navLink: <Link to="/login">log in instead</Link>,
    termsLink: <Link to="/terms-of-service">Terms of Service</Link>,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processForm: (user) => dispatch(signup(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
