import React, { useState, useEffect } from "react";
import {
  Container,
  CssBaseline,
  Box,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
} from "@mui/material";
import axios from "axios";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";
import { loginRequest, loginSuccess, loginFailure } from "../Slices/loginSlice";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import meeting from "../assets/meeting.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const initialValues = {
  email: "",
  password: "",
};

const validationSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});
const LoginForm = () => {
  const dispatch = useDispatch();
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const navigate = useNavigate();
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const isAuth = useSelector((state) => state.login.isAuth);

  useEffect(() => {
    if (isAuth) {
      navigate("/Home");
    }
  }, [isAuth, navigate]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (values, { setSubmitting }) => {
    const { email, password } = values;
    dispatch(loginRequest({ email, password }));
    setSubmitting(true);

    axios
      .post("http://localhost:5000/auth/login", { email, password })
      .then((response) => {
        if (response.status === "OK") {
          dispatch(loginSuccess(response.Token));
          setEmailError(false);
          setPasswordError(false);
          setSubmitSuccess(true);
          navigate("/Home"); // Use navigate() for redirection
        } else {
          dispatch(loginFailure());
          setEmailError(true);
          setPasswordError(true);
        }
        setSubmitting(false);
      })
      .catch((error) => {
        console.log(error);
        dispatch(loginFailure());
        setEmailError(true);
        setPasswordError(true);
        setSubmitting(false);
      });
  };

  const theme = createTheme({});

  return (
    <ThemeProvider theme={theme}>
      <Container className="Left-section">
        <h1 className="primary-heading title">Live work, live Reunify</h1>
        <img src={meeting} alt="meeting" className="image" />
      </Container>

      <Container component="main" className="Right-section">
        <CssBaseline />
        <Box
          sx={{
            backgroundColor: "rgb(255, 255, 255)",
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 5,
            borderradius: "75",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form noValidate>
                <Field
                  as={TextField}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  name="email"
                  label="Email Address"
                  autoComplete="email"
                  autoFocus
                  error={emailError}
                  helperText={<ErrorMessage name="email" />}
                />

                <Field
                  as={TextField}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  name="password"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  error={passwordError}
                  helperText={<ErrorMessage name="password" />}
                />

                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />

                <Button
                  type="submit"
                  disabled={isSubmitting || submitSuccess}
                  fullWidth
                  variant="contained"
                  style={{ backgroundColor: "rgb(63, 81, 181)" }}
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>

                <Grid container className="minimal-text">
                  <Grid item xs>
                    <RouterLink to="/forgotPassword" variant="body2">
                      Forgot password?
                    </RouterLink>
                  </Grid>
                  <Grid item>
                    <RouterLink to="/register" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </RouterLink>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default LoginForm;
