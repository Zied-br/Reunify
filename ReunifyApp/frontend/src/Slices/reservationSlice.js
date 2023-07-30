import { createSlice } from "@reduxjs/toolkit";

const reservationSlice = createSlice({
  name: "reservations",
  initialState: [],
  reducers: {
    addReservation: (state, action) => {
      state.push(action.payload);
    },
    updateReservation: (state, action) => {
      const { id, startTime, endTime, sujet, salleId, userId } = action.payload;
      const reservationToUpdate = state.find(
        (reservation) => reservation.id === id
      );
      if (reservationToUpdate) {
        reservationToUpdate.startTime = startTime;
        reservationToUpdate.endTime = endTime;
        reservationToUpdate.sujet = sujet;
        reservationToUpdate.salleId = salleId;
        reservationToUpdate.userId = userId;
      }
    },
    deleteReservation: (state, action) => {
      const idToDelete = action.payload;
      return state.filter((reservation) => reservation.id !== idToDelete);
    },
  },
});

export const { addReservation, updateReservation, deleteReservation } =
  reservationSlice.actions;
export default reservationSlice.reducer;
