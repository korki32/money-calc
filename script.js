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

    const calendarHTML = `
        <h2>${months[currentMonth]} ${currentYear}</h2>
        <table>
            <thead>
                <tr>
                    ${daysOfWeek.map(day => `<th>${day}</th>`).join('')}
                </tr>
            </thead>
            <tbody>
                <!-- Itt jeleníthetjük meg a naptár napjait JavaScript segítségével -->
            </tbody>
        </table>
    `;
    
    calendarContainer.innerHTML = calendarHTML;
}

// Naptár megjelenítése oldal betöltéskor
window.onload = function() {
    showCalendar();
}
