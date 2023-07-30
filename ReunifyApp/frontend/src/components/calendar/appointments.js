import React, { useEffect, useState } from "react";
import axios from "axios";

const Reservations = () => {
  {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
      const fetchReservations = async () => {
        try {
          const response = await axios.get(
            "http://localhost:5000/reservation/reservations"
          );
          setReservations(response.data);
        } catch (error) {
          console.error(
            "Erreur lors de la récupération des réservations :",
            error
          );
        }
      };

      fetchReservations();
    }, []);

    console.log(reservations);
    const reservationsArray = Array.isArray(reservations) ? reservations : [];

    return (
      <div>
        <h1>Liste des réservations</h1>
        <ul>
          {reservationsArray.length > 0 ? (
            reservationsArray.map((reservation) => (
              <li key={reservation.id}>
                location: {reservation.salleId}, title: {reservation.sujet},
                startDate: {reservation.startTime}, endDate:{" "}
                {reservation.endTime}
              </li>
            ))
          ) : (
            <li>No reservations found.</li>
          )}
        </ul>
      </div>
    );
  }
};

export default Reservations;
