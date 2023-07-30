import React from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import {
  Container,
  CssBaseline,
  Box,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "../styles/login.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import meeting from "../assets/meeting.png";
import {
  registerRequest,
  registerSuccess,
  registerFailure,
} from "../Slices/registerSlice";
const initialValues = {
  nom: "",
  prenom: "",
  email: "",
  password: "",
};
const RegisterForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(registerRequest());

    fetch(process.env.URL_API + "/auth/register", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "Done");

        if (data.status === "OK") {
          axios
            .post("http://localhost:5000/auth/register", values)
            .catch((e) => console.log(JSON.stringify(e.response.data)));
          dispatch(registerSuccess());
          window.location.href = "./";
        } else {
          dispatch(registerFailure());
        }
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const theme = createTheme({});

  const RegisterSchema = Yup.object().shape({
    nom: Yup.string().required("Nom is required"),
    prenom: Yup.string().required("Prénom is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  return (
    <ThemeProvider theme={theme}>
      <Container className="Left-section">
        <h1 className="primary-heading  title">Live work, live Reunify</h1>
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
            borderRadius: "75",
          }}
        >
          <Typography component="h1" variant="h4">
            Create your account
          </Typography>
          <Formik
            initialValues={{ initialValues }}
            validationSchema={RegisterSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form noValidate>
                <Field
                  as={TextField}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="prenom"
                  label="Name"
                  name="Name"
                  autoComplete="Name"
                />
                <ErrorMessage
                  name="Name"
                  component="div"
                  style={{ color: "red" }}
                />

                <Field
                  as={TextField}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="prenom"
                  label="LastName"
                  name="LastName"
                  autoComplete="LastName"
                />
                <ErrorMessage
                  name="LastName"
                  component="div"
                  style={{ color: "red" }}
                />

                <Field
                  as={TextField}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  style={{ color: "red" }}
                />

                <Field
                  as={TextField}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  style={{ color: "red" }}
                />

                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                >
                  Create your account
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default RegisterForm;
