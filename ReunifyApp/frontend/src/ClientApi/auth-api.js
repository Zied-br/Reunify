import axios from "axios";

const API_URL = process.env.API_URL;

const register = (nom, prenom, email, password) => {
  return axios.post(API_URL + "register", {
    nom,
    prenom,
    email,
    password,
  });
};

const login = (email, password) => {
  return axios.post(API_URL + "login", {
    email,
    password,
  });
};

export { register, login };
