// mail.js — saves contact/booking form data to Firebase Realtime Database

try {
  firebase.initializeApp({
    apiKey: "AIzaSyDmPEtEsNtxnGt-i4rYdTztfGSoAy2gkfE",
    authDomain: "contactform-4e4bb.firebaseapp.com",
    databaseURL: "https://contactform-4e4bb-default-rtdb.firebaseio.com",
    projectId: "contactform-4e4bb",
    storageBucket: "contactform-4e4bb.appspot.com",
    messagingSenderId: "720010558004",
    appId: "1:720010558004:web:eeece68921e98001146861"
  });
} catch (e) {
  // Already initialized
}

var contactformDB = firebase.database().ref("contactform");

var contactForm = document.getElementById("contactform");

if (contactForm) {
  contactForm.addEventListener("submit", submitForm);
}

function submitForm(e) {
  e.preventDefault();

  var name   = getElementByVal("name");
  var email  = getElementByVal("email");
  var mobile = getElementByVal("mobile");
  var people = getElementByVal("people");
  var date   = getElementByVal("date")     || "";
  var time   = getElementByVal("time")     || "";

  if (!name || !email) {
    alert("Please fill in all required fields.");
    return;
  }

  // Actually save the data to Firebase (was only console.log before)
  contactformDB.push({
    name:      name,
    email:     email,
    mobile:    mobile,
    people:    people,
    date:      date,
    time:      time,
    timestamp: Date.now()
  })
  .then(function() {
    alert("Message sent successfully! We'll be in touch soon.");
    if (contactForm) contactForm.reset();
  })
  .catch(function(error) {
    console.error("Firebase error:", error);
    alert("Something went wrong. Please try again.");
  });
}

const getElementByVal = (id) => {
  var el = document.getElementById(id);
  return el ? el.value.trim() : "";
};
