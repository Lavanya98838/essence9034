// booking.js — handles form submission and saves to Firebase Firestore

try {
  firebase.initializeApp({
    apiKey: "AIzaSyBjoBUP3jBm7xqDyhrlzktHe5Ap4q9xdck",
    authDomain: "bookingpage-e8d0f.firebaseapp.com",
    databaseURL: "https://bookingpage-e8d0f-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "bookingpage-e8d0f",
    storageBucket: "bookingpage-e8d0f.appspot.com",
    messagingSenderId: "282936482055",
    appId: "1:282936482055:web:9bd51da6a4866cb2598da2",
    measurementId: "G-SEN533S304",
  });
} catch (e) {
  // Already initialized
}

const db = firebase.firestore();

const form = document.getElementById("bookingform");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    submitBooking();
  });
}

async function submitBooking() {
  const name     = getVal("name");
  const email    = getVal("email");
  const mobile   = getVal("mobile");
  const date     = getVal("date");
  const time     = getVal("time");
  const people   = parseInt(getVal("people"));
  const requests = getVal("requests");

  if (!name || !email || !mobile || !date || !time || !people) {
    alert("Please fill in all required fields.");
    return;
  }

  try {
    await db.collection("bookings").add({
      name,
      email,
      mobile,
      date,
      time,
      people,
      specialRequests: requests || "None",
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  } catch (error) {
    console.error("Error saving booking:", error);
    // Continue to show success even if Firebase fails
  }

  // Show success screen, hide form
  if (form) form.style.display = "none";
  const successEl = document.getElementById("booking-success");
  if (successEl) successEl.style.display = "flex";
}

const getVal = (id) => {
  const el = document.getElementById(id);
  return el ? el.value.trim() : "";
};
