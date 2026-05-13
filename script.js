document.getElementById("bookingForm").addEventListener("submit", function (e) {
  e.preventDefault();
  validateBookingForm();
});

function validateBookingForm() {
  const fullName = document.getElementById("fullName").value.trim();
  const idNumber = document.getElementById("idNumber").value.trim();
  const serviceType = document.getElementById("serviceType").value;
  const bookingDate = document.getElementById("bookingDate").value;
  const contact = document.getElementById("contact").value.trim();
  const messageArea = document.getElementById("messageArea");

  // Reset message area
  messageArea.style.display = "none";
  messageArea.className = "";

  const today = new Date();
  const selectedDate = new Date(bookingDate);
  const isWeekend = selectedDate.getDay() === 0 || selectedDate.getDay() === 6;

  if (!fullName || !idNumber || !serviceType || !bookingDate || !contact) {
    showMessage("Please fill in all required fields correctly.", "error");
    return;
  }

  if (!/^\d{13}$/.test(idNumber)) {
    showMessage("ID Number must be exactly 13 digits.", "error");
    return;
  }

  if (selectedDate < today.setHours(0, 0, 0, 0)) {
    showMessage("Booking date cannot be in the past.", "error");
    return;
  }

  if (isWeekend) {
    showMessage("The Licensing Department is closed on weekends.", "error");
    return;
  }

  // Passed all validations
  const reference = generateBookingReference();
  showConfirmation(fullName, serviceType, bookingDate, reference);
  clearForm();
}

function generateBookingReference() {
  const number = Math.floor(Math.random() * 9000) + 1000; // 1000 to 9999
  return `STLM-${number}`;
}

function showMessage(message, type) {
  const messageArea = document.getElementById("messageArea");
  messageArea.innerText = message;
  messageArea.className = type;
  messageArea.style.display = "block";
}

function showConfirmation(name, service, date, reference) {
  const formattedDate = new Date(date).toISOString().split("T")[0];
  const confirmationMessage = `
    Booking Confirmed!\n
    Name: ${name}\n
    Service: ${service.toUpperCase()}\n
    Date: ${formattedDate}\n
    Reference: ${reference}
  `;
  showMessage(confirmationMessage, "success");
}

function clearForm() {
  document.getElementById("bookingForm").reset();
}
