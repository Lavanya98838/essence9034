// firebase.js — saves booking form data to Firebase Realtime Database

try {
  firebase.initializeApp({
    apiKey: "AIzaSyC5ws8vODpWsEjh_9lFjLbNilKdJ5miiiA",
    authDomain: "booking-3c528.firebaseapp.com",
    databaseURL: "https://booking-3c528-default-rtdb.firebaseio.com",
    projectId: "booking-3c528",
    storageBucket: "booking-3c528.appspot.com",
    messagingSenderId: "378143886888",
    appId: "1:378143886888:web:b53b6424a4bdac98102f1d"
  });
} catch (e) {
  // Already initialized
}

var restaurantPageRef = firebase.database().ref("bookings");

var bookingForm = document.getElementById("bookingform") || document.getElementById("bookingForm");

if (bookingForm) {
  bookingForm.addEventListener("submit", submitForm);
}

function submitForm(e) {
  e.preventDefault();

  var name     = getElementVal("name");
  var email    = getElementVal("email");
  var mobile   = getElementVal("mobile");
  var people   = getElementVal("people");
  var date     = getElementVal("date")     || "";
  var time     = getElementVal("time")     || "";
  var requests = getElementVal("requests") || "";

  if (!name || !email || !mobile || !people) {
    alert("Please fill in all required fields.");
    return;
  }

  // Save to Firebase Realtime Database
  restaurantPageRef.push({
    name:            name,
    email:           email,
    mobile:          mobile,
    people:          people,
    date:            date,
    time:            time,
    specialRequests: requests || "None",
    timestamp:       Date.now()
  })
  .then(function() {
    // Show success screen if it exists, otherwise alert
    var successEl = document.getElementById("booking-success");
    var form = document.getElementById("bookingform") || document.getElementById("bookingForm");
    if (successEl && form) {
      form.style.display = "none";
      successEl.style.display = "flex";
    } else {
      alert("Booking submitted successfully!");
      if (form) form.reset();
    }
  })
  .catch(function(error) {
    console.error("Firebase error:", error);
    alert("An error occurred. Please try again.");
  });
}

const getElementVal = (id) => {
  var el = document.getElementById(id);
  return el ? el.value.trim() : "";
};
