// === 1. JS Setup ===
console.log("Welcome to the Community Portal");
window.addEventListener('load', () => {
  alert("Page fully loaded!");
  const saved = localStorage.getItem("preferredEvent");
  if (saved) {
    const select = document.getElementById("regEventType");
    if (select) {
      select.value = saved;
      showFee(select);
    }
  }
  displayValidEvents();
  renderEventCards();
});

// === 2. Syntax, Data Types, Operators ===
const defaultEventName = "Spring Festival";
const defaultDate = "2025-06-10";
let availableSeats = 50;
let registeredCount = 0;

// === 3. Conditionals, Loops, Error Handling ===
const events = [
  { name: "Spring Festival", date: "2025-06-10", category: "Festival", seats: 30 },
  { name: "Health Fair", date: "2025-08-10", category: "Health", seats: 20 },
  { name: "Music Concert", date: "2025-07-15", category: "Music", seats: 25 }
];

function displayValidEvents() {
  const eventList = document.getElementById("eventList");
  if (!eventList) return;
  eventList.innerHTML = "";
  events.forEach(event => {
    if (new Date(event.date) > new Date() && event.seats > 0) {
      const li = document.createElement("li");
      li.textContent = `${event.name} (${event.category}) - Seats: ${event.seats}`;
      eventList.appendChild(li);
    }
  });
}

// === 4. Functions, Closures, HOF ===
function addEvent(eventObj) {
  events.push(eventObj);
}

function registerUserForEvent(name, eventName) {
  try {
    const event = events.find(e => e.name === eventName);
    if (!event || event.seats <= 0) throw "Event full or not found.";
    event.seats--;
    console.log(`${name} registered for ${eventName}`);
  } catch (err) {
    alert("Error: " + err);
  }
}

function filterEventsByCategory(category, callback) {
  const filtered = events.filter(e => e.category === category);
  callback(filtered);
}

function categoryRegistrationTracker(category) {
  let count = 0;
  return function () {
    count++;
    console.log(`${category} registrations: ${count}`);
  };
}
const trackMusicReg = categoryRegistrationTracker("Music");

// === 5. Objects, Prototypes ===
function Event(name, date, category, seats) {
  this.name = name;
  this.date = date;
  this.category = category;
  this.seats = seats;
}
Event.prototype.checkAvailability = function () {
  return this.seats > 0;
};

// === 6. Arrays, Methods ===
function formatEventCards() {
  return events.map(e => `${e.category} - ${e.name}`);
}

// === 7. DOM Manipulation ===
function renderEventCards() {
  const container = document.getElementById("eventCards");
  if (!container) return;
  container.innerHTML = "";
  events.forEach(event => {
    const card = document.createElement("div");
    card.className = "event-card";
    card.textContent = `${event.name} - ${event.date}`;
    container.appendChild(card);
  });
}

// === 8. Event Handling ===
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("regForm")?.addEventListener("submit", handleRegister);
  document.getElementById("regEventType")?.addEventListener("change", e => showFee(e.target));
  document.getElementById("feedbackText")?.addEventListener("input", e => countChars(e.target));
  document.getElementById("feedbackForm")?.addEventListener("submit", handleFeedback);
  document.getElementById("clearBtn")?.addEventListener("click", clearPreferences);
  document.getElementById("geoBtn")?.addEventListener("click", getLocation);
});

// === 9. Async JS, Promises ===
function fetchMockEvents() {
  document.getElementById("loading")?.classList.remove("hidden");
  return new Promise(resolve => {
    setTimeout(() => {
      document.getElementById("loading")?.classList.add("hidden");
      resolve(events);
    }, 1500);
  });
}

async function loadEvents() {
  const data = await fetchMockEvents();
  console.log("Loaded Events:", data);
}

// === 10. Modern JS Features ===
function describeEvent({ name, category, date }) {
  console.log(`${name} (${category}) on ${date}`);
}
const allEventNames = [...events].map(e => e.name);

// === 11. Form Handling ===
function handleRegister(e) {
  e.preventDefault();
  const form = document.forms["regForm"];
  const name = document.getElementById('regName').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const phone = form["regPhone"].value.trim();
  const eventType = form["regEventType"].value;

  if (!name || !email || !eventType) {
    alert("Please fill in all required fields.");
    return;
  }
  if (phone && !/^[0-9]{10}$/.test(phone)) {
    alert("Please enter a valid 10-digit phone number.");
    return;
  }
document.getElementById("regForm")?.addEventListener("submit", handleRegister);
  document.getElementById("regOutput").value = `Thanks ${name}, registered for ${eventType}`;
  localStorage.setItem("preferredEvent", eventType);
  form.reset();
  document.getElementById("eventFee").innerText = "₹0";
}

function showFee(select) {
  const feeMap = {
    "Spring Festival": "₹100",
    "Health Fair": "₹50",
    "Music Concert": "₹150"
  };
  document.getElementById("eventFee").innerText = feeMap[select.value] || "₹0";
  localStorage.setItem("preferredEvent", select.value);
}

// === 12. AJAX & Fetch Simulation ===
function postUserData(data) {
  console.log("Sending data to server...", data);
  setTimeout(() => alert("Submitted successfully!"), 1000);
}

// === 13. Debugging ===
function debugSubmission(data) {
  console.log("Debug submission:", data);
  debugger;
}

// === 14. jQuery Example ===
$(document).ready(function () {
  $('#registerBtn').click(function () {
    $('#confirmationMsg').fadeIn().delay(2000).fadeOut();
  });
});

// === Feedback ===
function handleFeedback(event) {
  event.preventDefault();
  const feedback = document.getElementById('feedbackText').value.trim();
  if (feedback.length === 0) {
    alert("Please enter your feedback before submitting.");
    return;
  }
  document.getElementById('feedbackOutput').innerText = "Thank you for your feedback!";
  event.target.reset();
  document.getElementById('charCount').innerText = 0;
}

function countChars(el) {
  document.getElementById("charCount").innerText = el.value.length;
}

// === Geolocation ===
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    document.getElementById("geoOutput").innerText = "Geolocation is not supported.";
  }
}
function showPosition(position) {
  document.getElementById("geoOutput").innerText = `Lat: ${position.coords.latitude}, Lon: ${position.coords.longitude}`;
}
function showError(error) {
  const messages = ["Permission denied", "Unavailable", "Timeout", "Unknown error"];
  alert(messages[error.code] || "Geolocation error.");
}

// === Preferences ===
function clearPreferences() {
  localStorage.clear();
  sessionStorage.clear();
  alert("Preferences cleared.");
  location.reload();
}

window.onbeforeunload = function () {
  const name = document.getElementById('regName')?.value;
  const email = document.getElementById('regEmail')?.value;
  if (name || email) {
    return "You have unsaved changes. Are you sure you want to leave?";
  }
};
