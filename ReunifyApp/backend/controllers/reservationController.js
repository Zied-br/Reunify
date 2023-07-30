const { models } = require("../models/index");
async function createReservation(req, res) {
  try {
    const { salleId, sujet, startTime, endTime, userId } = req.body;

    const reservation = await models.reservation.create({
      salleId,
      startTime,
      endTime,
      sujet,
      userId,
    });

    res.status(201).json(reservation);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Erreur lors de la création de la réservation" });
  }
}

const getReservationsBySalleId = async (req, res) => {
  const { salleId } = req.params;
  
  try {
    const reservations = await models.reservation.findAll({
      where: { salleId: salleId },
    });
   

    if (reservations.length === 0) {
      return res.status(404).json({ message: "No reservations found for the provided salleId." });
    }

    return res.status(200).json(reservations);
  } catch (error) {
    return res.status(500).json({ message: "An error occurred while fetching reservations." });
  }
};

const getAllReservation = async (req, res) => {
  try {
    const reservations = await models.reservation.findAll();
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving reservations" });
  }
};

module.exports = {
  createReservation,
  getReservationsBySalleId,
  getAllReservation,
};
