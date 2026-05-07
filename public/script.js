const appointmentForm = document.getElementById("appointmentForm");
const appointmentsList = document.getElementById("appointmentsList");

let editingIndex = null;
let appointments = [];

appointmentForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const patientName = document.getElementById("patientName").value;
  const appointmentDate = document.getElementById("appointmentDate").value;
  const appointmentTime = document.getElementById("appointmentTime").value;
  const doctorName = document.getElementById("doctorName").value;
  const reason = document.getElementById("reason").value;

  const newAppointment = {
  patientName,
  appointmentDate,
  appointmentTime,
  doctorName,
  reason
};

  if (editingIndex === null) {
  await fetch("/appointments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newAppointment)
  });
} else {
  await fetch(`/appointments/${editingIndex}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newAppointment)
  });

  editingIndex = null;
}

  appointmentForm.reset();

  document.querySelector("button[type='submit']").textContent = "Add Appointment";

  loadAppointments();
});

async function loadAppointments() {
  const response = await fetch("/appointments");

  appointments = await response.json();

  appointmentsList.innerHTML = "";

  appointments.forEach((appointment, index) => {
    const appointmentCard = document.createElement("div");

    appointmentCard.classList.add("appointment-card");

    appointmentCard.innerHTML = `
  <h3>${appointment.patientName}</h3>
  <p>Date: ${appointment.appointmentDate}</p>
  <p>Time: ${appointment.appointmentTime}</p>
  <p>Doctor: ${appointment.doctorName}</p>
  <p>Reason: ${appointment.reason}</p>

  <button onclick="editAppointment(${index})">
    Edit
  </button>

  <button onclick="deleteAppointment(${index})">
    Delete
  </button>
`;

    appointmentsList.appendChild(appointmentCard);
  });
}

async function deleteAppointment(index) {
  await fetch(`/appointments/${index}`, {
    method: "DELETE"
  });

  loadAppointments();
}

function editAppointment(index) {
  const appointment = appointments[index];

  document.getElementById("patientName").value = appointment.patientName;

  document.getElementById("appointmentDate").value =
    appointment.appointmentDate;

  document.getElementById("appointmentTime").value =
    appointment.appointmentTime;

  document.getElementById("doctorName").value =
    appointment.doctorName;

  document.getElementById("reason").value =
    appointment.reason;

  editingIndex = index;

  document.querySelector("button[type='submit']").textContent =
    "Update Appointment";
}

loadAppointments();
