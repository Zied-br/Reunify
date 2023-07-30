// store.js
import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../Slices/loginSlice";
import registerReducer from "../Slices/registerSlice";
import reservationReducer from "../Slices/reservationSlice";

const store = configureStore({
  reducer: {
    login: loginReducer,
    register: registerReducer,
    reservations: reservationReducer,
  },
});

export default store;
