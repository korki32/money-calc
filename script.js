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
