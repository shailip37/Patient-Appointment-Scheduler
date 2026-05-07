const express = require("express");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.static("public"));

let appointments = [];

app.get("/", (req, res) => {
  res.status(200).send("Server is running!");
});

app.get("/appointments", (req, res) => {
  res.json(appointments);
});

app.post("/appointments", (req, res) => {
  const newAppointment = req.body;

  appointments.push(newAppointment);

  res.status(201).json({
    message: "Appointment added successfully",
    appointment: newAppointment
  });
});
app.delete("/appointments/:index", (req, res) => {
  const index = req.params.index;

  appointments.splice(index, 1);

  res.json({
    message: "Appointment deleted successfully"
  });
});

app.put("/appointments/:index", (req, res) => {
  const index = req.params.index;
  const updatedAppointment = req.body;

  appointments[index] = updatedAppointment;

  res.json({
    message: "Appointment updated successfully",
    appointment: updatedAppointment
  });
});

app.listen(PORT, "127.0.0.1", () => {
  console.log(`Server running at http://127.0.0.1:${PORT}`);
});


