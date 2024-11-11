//// LET'S BEGIN
let currentForm = "oneWay";

//* Togglin' dropdowns
const selectButtons = document.querySelectorAll(".selectBtn");
const options = document.querySelectorAll(".option");
let zIndex = 1;

selectButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const dropdown = event.target.nextElementSibling;
    dropdown.classList.toggle("toggle");
    dropdown.style.zIndex = zIndex++;
  });
});

//* Updatin' selected option
options.forEach((option) => {
  option.addEventListener("click", (event) => {
    const dropdown = event.target.parentElement;
    dropdown.classList.remove("toggle");
    const selectButton = dropdown.previousElementSibling;
    selectButton.setAttribute("data-type", event.target.innerHTML);
    selectButton.innerHTML = event.target.innerHTML;
  });
});

//* Initializin' datepickers for departure and return dates
$(function () {
  $("#sourcedatepicker").datepicker();
  $("#sourcedatepicker").prop("readonly", true);

  $("#roundsourcedatepicker").datepicker();
  $("#roundsourcedatepicker").prop("readonly", true);

  $("#returndatepicker").datepicker();
  $("#returndatepicker").prop("readonly", true);
});

//* Togglin' between one-way and round-trip forms and clear fields
const oneWayForm = document.querySelector(".left");
const roundTripForm = document.querySelector(".round");

function toggleForms(showOneWay) {
  if (showOneWay) {
    oneWayForm.style.display = "block";
    roundTripForm.style.display = "none";
    currentForm = "oneWay";
  } else {
    roundTripForm.style.display = "block";
    oneWayForm.style.display = "none";
    currentForm = "twoWay";
  }

  revertBack();
}

document.querySelectorAll(".one-way-button").forEach((btn) => {
  btn.addEventListener("click", () => {
    toggleForms(true);
  });
});

document.querySelectorAll(".round-trip-button").forEach((btn) => {
  btn.addEventListener("click", () => {
    toggleForms(false);
  });
});

function revertBack() {
  // Reset One-Way Form
  const oneWayPickup = document.querySelector(".selectOneFrom .selectBtn");
  const oneWayDestination = document.querySelector(".selectOneTo .selectBtn");
  const oneWayDate = document.getElementById("sourcedatepicker");
  const oneWayPassengers = document.querySelector(
    ".selectOneDriver .selectBtn"
  );

  oneWayPickup.innerHTML =
    '<i class="fas fa-map-marker-alt"></i>Select Pickup Point';
  oneWayPickup.setAttribute("data-type", "fromOption");
  oneWayDestination.innerHTML =
    '<i class="fas fa-map-marker-alt"></i>Select Destination';
  oneWayDestination.setAttribute("data-type", "toOption");
  oneWayDate.value = ""; // Clear date input
  oneWayPassengers.innerHTML = '<i class="fas fa-car"></i>Select Driver'; // Reset driver selection

  // Reset Round-Trip Form
  const roundTripPickup = document.querySelector(".selectRoundFrom .selectBtn");
  const roundTripDestination = document.querySelector(
    ".selectRoundTo .selectBtn"
  );
  const roundTripDepartureDate = document.getElementById(
    "roundsourcedatepicker"
  );
  const roundTripReturnDate = document.getElementById("returndatepicker");
  const roundTripPassengers = document.querySelector(
    ".selectRoundDriver .selectBtn"
  );

  roundTripPickup.innerHTML =
    '<i class="fas fa-map-marker-alt"></i>Select Pickup Point';
  roundTripPickup.setAttribute("data-type", "fromOption");
  roundTripDestination.innerHTML =
    '<i class="fas fa-map-marker-alt"></i>Select Destination';
  roundTripDestination.setAttribute("data-type", "toOption");
  roundTripDepartureDate.value = ""; // Clear departure date input
  roundTripReturnDate.value = ""; // Clear return date input
  roundTripPassengers.innerHTML = '<i class="fas fa-car"></i>Select Driver'; // Reset driver selection
}

///// Function to handle cancel button click
function cancel() {
  document.querySelector(".receipt").style.display = "none";
  document.querySelector(".booker").style.display = "none";

  // Show the form based on the current state
  if (currentForm === "oneWay") {
    oneWayForm.style.display = "block";
  } else {
    roundTripForm.style.display = "block";
  }

  document.querySelector("h3.getquotetext").innerText = "Book a Ride";
  document.querySelector(".bookerz").style.display = "none";
}

///////////////////////////////////////////////////////////////////////////////////////////
//////////////////////// CALCULATIN, PRICE AND GENERATIN RECEIPT //////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

const carDriverData = {
  "Kabarak University": {
    Nairobi: [
      {
        car: "Toyota Vitz",
        driver: "Mwangi Kamau",
        fare: 600,
        time: "2 mins away",
      },
      {
        car: "Honda Fit",
        driver: "Amani Wanjiru",
        fare: 550,
        time: "15 mins away",
      },
      {
        car: "Nissan March",
        driver: "Juma Karanja",
        fare: 580,
        time: "10 mins away",
      },
    ],
    Naivasha: [
      {
        car: "Mazda Demio",
        driver: "Juma Karanja",
        fare: 750,
        time: "30 mins away",
      },
      {
        car: "Toyota Prius",
        driver: "Kezia Nyambura",
        fare: 700,
        time: "10 mins away",
      },
      {
        car: "Suzuki Swift",
        driver: "Wambui Nyakinyua",
        fare: 720,
        time: "25 mins away",
      },
    ],
    Mombasa: [
      {
        car: "Nissan Note",
        driver: "Farah Omar",
        fare: 3500,
        time: "1 hr 45 mins away",
      },
      {
        car: "Subaru Forester",
        driver: "Diana Mwende",
        fare: 3600,
        time: "1 hr 30 mins away",
      },
      {
        car: "Toyota RAV4",
        driver: "Ali Mbogo",
        fare: 3800,
        time: "1 hr 50 mins away",
      },
    ],
  },
  "Kampi Ya Moto": {
    Nairobi: [
      {
        car: "Toyota Corolla",
        driver: "Kiptoo Koech",
        fare: 500,
        time: "5 mins away",
      },
      {
        car: "Suzuki Alto",
        driver: "Lilian Njeri",
        fare: 450,
        time: "12 mins away",
      },
      {
        car: "Daihatsu Sirion",
        driver: "Peter Ndung'u",
        fare: 480,
        time: "8 mins away",
      },
    ],
    Naivasha: [
      {
        car: "Mitsubishi Mirage",
        driver: "Abdi Hassan",
        fare: 750,
        time: "40 mins away",
      },
      {
        car: "Hyundai i10",
        driver: "Aisha Juma",
        fare: 700,
        time: "25 mins away",
      },
      {
        car: "Kia Picanto",
        driver: "Zawadi Muthoni",
        fare: 720,
        time: "30 mins away",
      },
    ],
    Mombasa: [
      {
        car: "Ford Focus",
        driver: "Daniel Ndung'u",
        fare: 3500,
        time: "2 hrs 10 mins away",
      },
      {
        car: "Chevrolet Spark",
        driver: "Anita Karanja",
        fare: 3450,
        time: "1 hr 55 mins away",
      },
      {
        car: "Toyota Land Cruiser",
        driver: "Joseph Mwangi",
        fare: 5000,
        time: "2 hrs 30 mins away",
      },
    ],
  },
  "Mercy Njeri": {
    Nairobi: [
      {
        car: "Toyota Axio",
        driver: "Peter Otieno",
        fare: 450,
        time: "10 mins away",
      },
      {
        car: "Volkswagen Polo",
        driver: "Wanjiku Mwangi",
        fare: 440,
        time: "20 mins away",
      },
      {
        car: "Renault Kwid",
        driver: "Joyce Njeri",
        fare: 460,
        time: "15 mins away",
      },
    ],
    Naivasha: [
      {
        car: "Honda Civic",
        driver: "Moses Chege",
        fare: 700,
        time: "35 mins away",
      },
      {
        car: "Ford Fiesta",
        driver: "Joyce Wambui",
        fare: 680,
        time: "28 mins away",
      },
      {
        car: "Fiat Panda",
        driver: "Peter Muriithi",
        fare: 670,
        time: "30 mins away",
      },
    ],
    Mombasa: [
      {
        car: "Mazda CX-5",
        driver: "Kevin Mutua",
        fare: 3800,
        time: "2 hrs away",
      },
      {
        car: "Kia Sportage",
        driver: "Irene Nduku",
        fare: 3700,
        time: "1 hr 50 mins away",
      },
      {
        car: "Honda HR-V",
        driver: "Jemimah Mburu",
        fare: 3900,
        time: "2 hrs 10 mins away",
      },
    ],
  },
};

let selectedOneWayRideIndex = null;
let selectedRoundTripRideIndex = null;

//* Function to update available rides based on selected locations (one-way)
function updateAvailableRides() {
  const fromLocation = $(".selectOneFrom .selectBtn").text().trim();
  const toLocation = $(".selectOneTo .selectBtn").text().trim();

  const driverOptions = $("#oneWayDriverOptions");
  driverOptions.empty(); // Clearin' previous options

  if (carDriverData[fromLocation] && carDriverData[fromLocation][toLocation]) {
    const availableDrivers = carDriverData[fromLocation][toLocation];

    availableDrivers.forEach((ride, index) => {
      driverOptions.append(
        `<div class="option fromya" data-type="option${index + 1}">
  <div style="margin: 0; display: flex; align-items: center; gap: 2px;">
    <i class="fas fa-car"></i>
    ${ride.car} - Driver: ${ride.driver} - Fare: Ksh ${ride.fare}
  </div>
  <p style="margin-top: 10px!important; display: flex; align-items: center; gap: 2px;">
    <i class="fas fa-clock"></i> ${ride.time} from you
  </p>
</div>
`
      );
    });
  } else {
    driverOptions.append(
      "<div class='option' data-type='noOption'>No available rides</div>"
    );
  }
}

//* Function to update available rides for round trips
function updateAvailableRoundRides() {
  const fromLocation = $(".selectRoundFrom .selectBtn").text().trim();
  const toLocation = $(".selectRoundTo .selectBtn").text().trim();

  const driverOptions = $("#roundTripCarDriverOptions");
  driverOptions.empty(); // Clear previous options

  if (carDriverData[fromLocation] && carDriverData[fromLocation][toLocation]) {
    const availableDrivers = carDriverData[fromLocation][toLocation];

    availableDrivers.forEach((ride, index) => {
      driverOptions.append(
        `<div class="option fromya" data-type="option${index + 1}">
  <div style="margin: 0; display: flex; align-items: center; gap: 2px;">
    <i class="fas fa-car"></i>
    ${ride.car} - Driver: ${ride.driver} - Fare: Ksh ${ride.fare}
  </div>
  <p style="margin-top: 10px!important; display: flex; align-items: center; gap: 2px;">
    <i class="fas fa-clock"></i> ${ride.time} from you
  </p>
</div>`
      );
    });
  } else {
    driverOptions.append(
      "<div class='option' data-type='noOption'>❌ No available rides</div>"
    );
  }
}

// Attachin' event listeners to dynamically added options for one-way
$("#oneWayDriverOptions").on("click", ".option", function () {
  const selectedOption = $(this).text();
  const selectBtn = $(".selectOneDriver .selectBtn");
  selectBtn.text(selectedOption).attr("data-type", $(this).attr("data-type"));
  $(this).closest(".selectDropdown").removeClass("toggle"); // Close dropdown
});

// Attachin' event listeners to dynamically added options for round trip
$("#roundTripCarDriverOptions").on("click", ".option", function () {
  const selectedOption = $(this).text();
  const selectBtn = $(".selectRoundDriver .selectBtn");
  selectBtn.text(selectedOption).attr("data-type", $(this).attr("data-type"));
  $(this).closest(".selectDropdown").removeClass("toggle"); // Close dropdown
});

//// GETITN PICKUP POINT - ONE WAY

$(".selectOneFrom .selectDropdown .option").on("click", function () {
  const iconClass = $(this).data("icon");
  const text = $(this).data("text");

  // Buildin' the HTML with the icon and text
  const iconHtml = `<i class="${iconClass}"></i>`;
  $(".selectOneFrom .selectBtn").html(iconHtml + " " + text);

  updateAvailableRides();
});

//// GETITN DESTINATION POINT - ONE WAY
$(".selectOneTo .selectDropdown .option").on("click", function () {
  const iconHtml = $(this).find("i").prop("outerHTML");
  const text = $(this).text().trim();

  $(".selectOneTo .selectBtn").html(iconHtml + " " + text);
  updateAvailableRides();
});

//// GETITN PICKUP POINT -ROUND TRIP

$(".selectRoundFrom .selectDropdown .option").on("click", function () {
  const iconHtml = $(this).find("i").prop("outerHTML");
  const text = $(this).text().trim(); // Get the text only
  $(".selectRoundFrom .selectBtn").html(iconHtml + " " + text);
  updateAvailableRoundRides();
});

//// GETITN DESTINATION POINT - ROUND TRIP
$(".selectRoundTo .selectDropdown .option").on("click", function () {
  const iconHtml = $(this).find("i").prop("outerHTML");
  const text = $(this).text().trim(); // Get the text only
  $(".selectRoundTo .selectBtn").html(iconHtml + " " + text); // Set icon and text
  updateAvailableRoundRides(); // Update rides when "To" is selected
});

//// GETITin SELECTED DRIVER ONE WAY
$("#oneWayDriverOptions").on("click", ".option", function () {
  const iconHtml = $(this).find("i").prop("outerHTML"); // Capture icon HTML
  const driverText = $(this)
    .find("div")
    .contents()
    .filter(function () {
      return this.nodeType === Node.TEXT_NODE; // Get only the text node for driver details
    })
    .text()
    .trim(); // Get the text without the icon

  const selectBtn = $(".selectOneDriver .selectBtn");

  // Set the combined icon and driver text for display and update data attribute
  selectBtn
    .html(iconHtml + " " + driverText) // Combine icon and driver details
    .attr("data-type", $(this).attr("data-type"));
  $(this).closest(".selectDropdown").removeClass("toggle"); // Close dropdown

  // Store selected ride index
  selectedOneWayRideIndex = $(this).index();
});

//// GETITin SELECTED DRIVER ROUND TRIP

$("#roundTripCarDriverOptions").on("click", ".option", function () {
  const iconHtml = $(this).find("i").prop("outerHTML"); // Capture icon HTML
  const driverText = $(this)
    .find("div")
    .contents()
    .filter(function () {
      return this.nodeType === Node.TEXT_NODE; // Get only the text node for driver details
    })
    .text()
    .trim(); // Get the text without the icon

  const selectBtn = $(".selectRoundDriver .selectBtn"); // Change to round driver select button

  // Set the combined icon and driver text for display and update data attribute
  selectBtn
    .html(iconHtml + " " + driverText) // Combine icon and driver details
    .attr("data-type", $(this).attr("data-type"));
  $(this).closest(".selectDropdown").removeClass("toggle"); // Close dropdown

  // Store selected ride index
  selectedRoundTripRideIndex = $(this).index(); // Change to round trip index
});

//// BOOOKIN REAL FUNCTION
document.addEventListener("DOMContentLoaded", function () {
  // Book Now buttons
  const bookNowOneWayButton = document.querySelector(".book-now-one-way");
  const bookNowRoundTripButton = document.querySelector(".book-now-round-trip");

  // One-Way inputs
  const oneWayInputs = {
    from: document.querySelector('.left .selectBtn[data-type="fromOption"]'),
    to: document.querySelector('.left .selectBtn[data-type="toOption"]'),
    departureDate: document.getElementById("sourcedatepicker"),
    passengers: document.querySelector(
      '.left .selectBtn[data-type="passengerOption"]'
    ),
  };

  // Round-Trip inputs
  const roundTripInputs = {
    from: document.querySelector('.round .selectBtn[data-type="fromOption"]'),
    to: document.querySelector('.round .selectBtn[data-type="toOption"]'),
    departureDate: document.getElementById("roundsourcedatepicker"),
    returnDate: document.getElementById("returndatepicker"),
    passengers: document.querySelector(
      '.round .selectBtn[data-type="passengerOption"]'
    ),
  };

  const receipt = document.querySelector(".receipt");
  const oneWayForm = document.querySelector(".left");
  const roundTripForm = document.querySelector(".round");
  const quoteText = document.querySelector("h3.getquotetext");

  // Helper function to validate dates
  function isValidFutureDate(date) {
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to midnight to compare only the date part
    return selectedDate >= today;
  }

  // Helper function to display an alert if inputs are invalid
  function showError(message) {
    // Set the message in the custom alert box
    const alertBox = document.getElementById("customAlert");
    document.getElementById("alertMessage").innerText = message;

    // Show the alert with fade-in
    alertBox.classList.remove("fade-out"); // Remove fade-out if it was previously added
    alertBox.classList.add("fade-in"); // Add fade-in
    alertBox.style.display = "block"; // Make it visible

    // After 5 seconds, fade out the alert
    setTimeout(() => {
      alertBox.classList.remove("fade-in");
      alertBox.classList.add("fade-out");
    }, 5000);

    // Hide the alert after the fade-out animation completes (another 0.5s)
    setTimeout(() => {
      alertBox.style.display = "none";
    }, 7000);
  }

  // Function to calculate price based on the selected locations and number of passengers AND THE DRIVER

  function calculatePrice(from, to, passengers, isRoundTrip = false) {
    const availableRides = carDriverData[from]?.[to];

    if (!availableRides || availableRides.length === 0) {
      showError("Price not available for selected locations.");
      return null; // Return null if no price is found
    }

    // Use the selected ride index; default to 0 if none selected
    const selectedIndex = isRoundTrip
      ? selectedRoundTripRideIndex
      : selectedOneWayRideIndex;
    const selectedRide = availableRides[selectedIndex || 0];
    const basePrice = selectedRide.fare;

    // Calculate prices based on passenger counts
    const passengerCounts = passengers.match(
      /(\d+) Adults?(?:, (\d+) Child(?:ren)?)?/
    );
    const adultCount = passengerCounts ? parseInt(passengerCounts[1]) : 0;
    const childCount =
      passengerCounts && passengerCounts[2] ? parseInt(passengerCounts[2]) : 0;
    const totalAdultPrice = basePrice * adultCount;
    const totalChildPrice = (basePrice / 2) * childCount;
    const totalBasePrice = totalAdultPrice + totalChildPrice;
    const tax = totalBasePrice * 0.1;
    const totalPrice = isRoundTrip
      ? (totalBasePrice + tax) * 2
      : totalBasePrice + tax;

    return {
      basePrice: isRoundTrip ? totalBasePrice * 2 : totalBasePrice,
      tax: isRoundTrip ? tax * 2 : tax,
      totalPrice,
    };
  }

  // Function to display the receipt
  async function displayReceipt(
    tripType,
    from,
    to,
    departureDate,
    passengers,
    returnDate = ""
  ) {
    const isRoundTrip = tripType === "Round-Trip";
    const priceDetails = calculatePrice(from, to, passengers, isRoundTrip);
    if (!priceDetails) return;

    const { basePrice, tax, totalPrice } = priceDetails;

    const selectedIndex = isRoundTrip
      ? selectedRoundTripRideIndex
      : selectedOneWayRideIndex;
    const selectedRide = carDriverData[from]?.[to]?.[selectedIndex || 0];
    const carDetails = selectedRide
      ? `${selectedRide.car} (Driver: ${selectedRide.driver})`
      : "No ride selected";

    let receiptHTML = `
    <div class="trip-detail-container">
      <div class="${
        isRoundTrip ? "round-trip-container" : "one-way-container"
      }">
        <h3 class="trip-detail-title">${tripType}</h3>
        <table>
          <tr><td>From</td><td>${from}</td></tr>
          <tr><td>To</td><td>${to}</td></tr>
          <tr><td>Passengers</td><td>${passengers}</td></tr>
          <tr><td>Departure</td><td>${departureDate}</td></tr>
          ${isRoundTrip ? `<tr><td>Return</td><td>${returnDate}</td></tr>` : ""}
        </table>
      </div>
      <hr>
      <div class="ride-details-container">
        <h3 class="trip-detail-title">Ride Details</h3>
        <p>${carDetails}</p>
      </div>
      <hr>
      <div class="price-container">
        <h3 class="trip-detail-title">Price</h3>
        <table>
          <tr><td>Base Price</td><td>KES ${basePrice}</td></tr>
          <tr><td>Tax</td><td>KES ${tax.toFixed(2)}</td></tr>
          <tr><td>Total Price</td><td>KES ${totalPrice.toFixed(2)}</td></tr>
        </table>
      </div>
      <hr>
      <h3 class="trip-detail-title">Route Overview: Distance & Est. Time</h3>
      <div id="map" style="height: 300px; width: 100%; margin-top: 15px;"></div>

      <table class="map-details">
        <tr><td>🤩 Finding Route Please Wait 🚘...</td></tr>
      </table>
      
    </div>
  `;

    oneWayForm.style.display = "none";
    roundTripForm.style.display = "none";
    receipt.innerHTML = receiptHTML;
    receipt.style.display = "block";

    const map = L.map("map").setView([0.0236, 37.9062], 6); // Centered in Kenya
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    async function getCoordinates(place) {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${place}`
      );
      const data = await response.json();
      if (data && data.length > 0) {
        return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
      } else {
        alert(`Could not find location: ${place}`);
        return null;
      }
    }

    async function getRoute(fromPlace, toPlace) {
      console.log(fromPlace, toPlace);
      const startCoords = await getCoordinates(
        fromPlace.replace(/, Town/g, "")
      );
      const endCoords = await getCoordinates(toPlace);

      if (startCoords && endCoords) {
        const response = await fetch(
          `https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf62482ca5ece423c340948ce5275be634f0a8&start=${startCoords[1]},${startCoords[0]}&end=${endCoords[1]},${endCoords[0]}`
        );
        const routeData = await response.json();

        if (routeData.features) {
          if (window.routeLayer) map.removeLayer(window.routeLayer);

          const routeCoords = routeData.features[0].geometry.coordinates.map(
            (coord) => [coord[1], coord[0]]
          );
          window.routeLayer = L.polyline(routeCoords, {
            color: "orange",
            weight: 5,
          }).addTo(map);

          L.marker(startCoords)
            .addTo(map)
            .bindPopup("🚘 Pickup: " + fromPlace)
            .openPopup();

          L.marker(endCoords)
            .addTo(map)
            .bindPopup("🚘 To: " + toPlace)
            .openPopup();

          map.fitBounds(window.routeLayer.getBounds());

          const distance = (
            routeData.features[0].properties.segments[0].distance / 1000
          ).toFixed(2);
          // Get duration in seconds from API data
          const durationInSeconds =
            routeData.features[0].properties.segments[0].duration;

          // Convert duration to hours and minutes
          let hours = Math.floor(durationInSeconds / 3600);
          let minutes = Math.round((durationInSeconds % 3600) / 60); // Remaining minutes

          // Create a human-readable duration text
          let durationText = "";
          if (hours > 0) {
            durationText += `${hours} Hour${hours > 1 ? "s" : ""}`; // Add hours if greater than 0
          }
          if (minutes > 0) {
            durationText +=
              (durationText ? " " : "") +
              `${minutes} Minute${minutes > 1 ? "s" : ""}`; // Add minutes if greater than 0
          }

          // Fallback if both hours and minutes are zero
          if (durationText === "") {
            durationText = "Less than a minute";
          }

          document.querySelector(".map-details").innerHTML = "";

          document.querySelector(
            ".map-details"
          ).innerHTML = `<tr><td> <i class="fa fa-road" aria-hidden="true"></i>  Distance:</td><td>${distance} Kilometers</td></tr>
        <tr><td> <i class="fas fa-clock" aria-hidden="true"></i>  Est. Travel Time:</td><td>${durationText}</td></tr>`;
        } else {
          message =
            "Could not retrieve route. Please check your locations and try again.";

          showError(message);
        }
      }
    }

    // Fetch and display route data
    getRoute(from, to);

    document.querySelector(".bookerz").style.display = "flex";
    document.querySelector(".booker").style.display = "block";
    document.querySelector(".booker").innerText = "Go to Payment";
    quoteText.innerText = "Checkout";
    quoteText.style.color = "grey";
  }

  // One-Way Trip validation and booking
  bookNowOneWayButton.addEventListener("click", function () {
    const from = oneWayInputs.from.textContent.trim();
    const to = oneWayInputs.to.textContent.trim();
    const departureDate = oneWayInputs.departureDate.value;
    const passengers = oneWayInputs.passengers.textContent.trim();

    // Validation for One-Way Trip
    if (
      !from ||
      !to ||
      !departureDate ||
      !passengers ||
      from === "Select Pickup Point" ||
      to === "Select Destination" ||
      passengers === "Choose People" ||
      from === "Select From List" ||
      to === "Select From List" ||
      passengers === "Select Driver"
    ) {
      showError("Please fill in all fields with valid details.");
      return;
    }

    if (!isValidFutureDate(departureDate)) {
      showError("The departure date must be today or a future date.");
      return;
    }

    // Display receipt if valid
    displayReceipt("One-Way", from, to, departureDate, passengers);
  });

  // Round-Trip validation and booking
  bookNowRoundTripButton.addEventListener("click", function () {
    const from = roundTripInputs.from.textContent.trim();
    const to = roundTripInputs.to.textContent.trim();
    const departureDate = roundTripInputs.departureDate.value;
    const returnDate = roundTripInputs.returnDate.value;
    const passengers = roundTripInputs.passengers.textContent.trim();

    // Validation for Round-Trip
    if (
      !from ||
      !to ||
      !departureDate ||
      !returnDate ||
      !passengers ||
      from === "Select Pickup Point" ||
      to === "Select Destination" ||
      passengers === "Choose People" ||
      from === "Select From List" ||
      to === "Select From List" ||
      passengers === "Select From List"
    ) {
      showError("Please fill in all fields with valid details.");
      return;
    }

    if (!isValidFutureDate(departureDate)) {
      showError("The departure date must be today or a future date.");
      return;
    }

    if (new Date(returnDate) <= new Date(departureDate)) {
      showError("The return date must be later than the departure date.");
      return;
    }

    // Display receipt if valid
    displayReceipt(
      "Round-Trip",
      from,
      to,
      departureDate,
      passengers,
      returnDate
    );
  });
});

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
