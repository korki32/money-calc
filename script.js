// Alapvető funkciók

// Naptár megjelenítése
function showCalendar() {
    // Ide írhatod a naptár megjelenítésének kódját
}

// Beállítások mentése
function saveSettings() {
    // Ide írhatod a beállítások mentésének kódját
}

// Fizetés kiszámítása
function calculatePayment() {
    // Ide írhatod a fizetés kiszámításának kódját
}

// Eseménykezelők hozzáadása

// Naptár megjelenítése oldal betöltéskor
window.onload = function() {
    showCalendar();
}

// Beállítások mentése gombra kattintáskor
document.getElementById('save-settings-btn').onclick = function() {
    saveSettings();
}

// Fizetés kiszámítása gombra kattintáskor
document.getElementById('calculate-payment-btn').onclick = function() {
    calculatePayment();
}

// Naptár megjelenítése
function showCalendar() {
    const calendarContainer = document.getElementById('calendar-container');
    const daysOfWeek = ['Hé', 'Ke', 'Sze', 'Cs', 'Pé', 'Szo', 'Vas'];
    const months = ['Január', 'Február', 'Március', 'Április', 'Május', 'Június', 'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December'];

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Naptár táblázat létrehozása
    const calendarTable = document.createElement('table');

    // Fejléc létrehozása: napok nevei
    const headerRow = document.createElement('tr');
    daysOfWeek.forEach(day => {
        const th = document.createElement('th');
        th.textContent = day;
        headerRow.appendChild(th);
    });
    calendarTable.appendChild(headerRow);

    // Naptár napjainak létrehozása
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    let dayOfMonth = 1;
    for (let i = 0; i < 6; i++) { // Maximum 6 sor lesz a naptárban
        const weekRow = document.createElement('tr');
        for (let j = 0; j < 7; j++) {
            if (dayOfMonth > daysInMonth) {
                break;
            }
            const td = document.createElement('td');
            td.textContent = dayOfMonth;
            weekRow.appendChild(td);
            dayOfMonth++;
        }
        calendarTable.appendChild(weekRow);
        if (dayOfMonth > daysInMonth) {
            break;
        }
    }

    // Hozzáadjuk a táblázatot a konténerhez
    calendarContainer.appendChild(calendarTable);
}

// Naptár megjelenítése oldal betöltéskor
window.onload = function() {
    showCalendar();
}
