const weekArray = ["Vas", "Hét", "Ked", "Sze", "Csü", "Pén", "Szo"];
const monthArray = [
  "Január",
  "Február",
  "Március",
  "Április",
  "Május",
  "Június",
  "Július",
  "Augusztus",
  "Szeptember",
  "Október",
  "November",
  "December"
];
const current = new Date();
const todaysDate = current.getDate();
const currentYear = current.getFullYear();
const currentMonth = current.getMonth();

window.onload = function () {
  const currentDate = new Date();
  generateCalendarDays(currentDate);

  let calendarWeek = document.getElementsByClassName("calendar-week")[0];
  let calendarTodayButton = document.getElementsByClassName(
    "calendar-today-button"
  )[0];
  calendarTodayButton.textContent = `Ma ${todaysDate}`;

  calendarTodayButton.addEventListener("click", () => {
    generateCalendarDays(currentDate);
  });

  weekArray.forEach((week) => {
    let li = document.createElement("li");
    li.textContent = week;
    li.classList.add("calendar-week-day");
    calendarWeek.appendChild(li);
  });

  const calendarMonths = document.getElementsByClassName("calendar-months")[0];
  const calendarYears = document.getElementsByClassName("calendar-years")[0];
  const monthYear = document.getElementsByClassName("calendar-month-year")[0];

  const selectedMonth = parseInt(monthYear.getAttribute("data-month") || 0);
  const selectedYear = parseInt(monthYear.getAttribute("data-year") || 0);

  monthArray.forEach((month, index) => {
    let option = document.createElement("option");
    option.textContent = month;
    option.value = index;
    option.selected = index === selectedMonth;
    calendarMonths.appendChild(option);
  });

  const currentYear = new Date().getFullYear();
  const startYear = currentYear - 60;
  const endYear = currentYear + 60;
  let newYear = startYear;
  while (newYear <= endYear) {
    let option = document.createElement("option");
    option.textContent = newYear;
    option.value = newYear;
    option.selected = newYear === selectedYear;
    calendarYears.appendChild(option);
    newYear++;
  }

  const leftArrow = document.getElementsByClassName("calendar-left-arrow")[0];

  leftArrow.addEventListener("click", () => {
    const monthYear = document.getElementsByClassName("calendar-month-year")[0];
    const month = parseInt(monthYear.getAttribute("data-month") || 0);
    const year = parseInt(monthYear.getAttribute("data-year") || 0);

    let newMonth = month === 0 ? 11 : month - 1;
    let newYear = month === 0 ? year - 1 : year;
    let newDate = new Date(newYear, newMonth, 1);
    generateCalendarDays(newDate);
  });

  const rightArrow = document.getElementsByClassName("calendar-right-arrow")[0];

  rightArrow.addEventListener("click", () => {
    const monthYear = document.getElementsByClassName("calendar-month-year")[0];
    const month = parseInt(monthYear.getAttribute("data-month") || 0);
    const year = parseInt(monthYear.getAttribute("data-year") || 0);
    let newMonth = month + 1;
    newMonth = newMonth === 12 ? 0 : newMonth;
    let newYear = newMonth === 0 ? year + 1 : year;
    let newDate = new Date(newYear, newMonth, 1);
    generateCalendarDays(newDate);
  });

  calendarMonths.addEventListener("change", function () {
    let newDate = new Date(calendarYears.value, calendarMonths.value, 1);
    generateCalendarDays(newDate);
  });

  calendarYears.addEventListener("change", function () {
    let newDate = new Date(calendarYears.value, calendarMonths.value, 1);
    generateCalendarDays(newDate);
  });
};

function generateCalendarDays(currentDate) {
  const newDate = new Date(currentDate);
  const year = newDate.getFullYear();
  const month = newDate.getMonth();
  const totalDaysInMonth = getTotalDaysInAMonth(year, month);
  const firstDayOfWeek = getFirstDayOfWeek(year, month);
  let calendarDays = document.getElementsByClassName("calendar-days")[0];

  removeAllChildren(calendarDays);

  let firstDay = 1;
  while (firstDay <= firstDayOfWeek) {
    let li = document.createElement("li");
    li.classList.add("calendar-day");
    calendarDays.appendChild(li);
    firstDay++;
  }

  let day = 1;
  while (day <= totalDaysInMonth) {
    let li = document.createElement("li");
    li.textContent = day;
    li.classList.add("calendar-day");
    if (todaysDate === day && currentMonth === month && currentYear === year) {
      li.classList.add("calendar-day-active");
    }
    calendarDays.appendChild(li);
    day++;
  }

  const monthYear = document.getElementsByClassName("calendar-month-year")[0];
  monthYear.setAttribute("data-month", month);
  monthYear.setAttribute("data-year", year);
  const calendarMonths = document.getElementsByClassName("calendar-months")[0];
  const calendarYears = document.getElementsByClassName("calendar-years")[0];
  calendarMonths.value = month;
  calendarYears.value = year;
}

function getTotalDaysInAMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year, month) {
  return new Date(year, month, 1).getDay();
}

function removeAllChildren(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

// Modális ablak megjelenítése
function showModal(workHours) {
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
    var workHoursInput = document.getElementById("workHours");
    workHoursInput.value = workHours || ""; // Ha van mentett munkaidő, megjelenítjük az input mezőben
}

// Modális ablak bezárása
function closeModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
}

// Ha a felhasználó kattint a bezárás ikonra vagy a háttérre, zárja be a modális ablakot
window.onclick = function(event) {
    var modal = document.getElementById("myModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Eseménykezelő a napokhoz
var days = document.querySelectorAll(".calendar-day");
days.forEach(function(day) {
    day.addEventListener("click", function() {
        var workHours = day.getAttribute("data-work-hours");
        showModal(workHours);
    });
});

// Munkaidő mentése
var saveButton = document.getElementById("saveButton");
saveButton.addEventListener("click", function() {
    var workHours = document.getElementById("workHours").value;
    var selectedDay = document.querySelector(".calendar-day-selected");
    selectedDay.setAttribute("data-work-hours", workHours);
    console.log("Munkaidő mentve: " + workHours);
    closeModal(); // Modális ablak bezárása
});

