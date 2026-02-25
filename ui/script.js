// Initiera variabler och hämta från LocalStorage
let cartCount = parseInt(localStorage.getItem('cartCount')) || 0;
const cartCounterEl = document.getElementById('cart-counter');
const summaryCountEl = document.getElementById('summary-count');

// Funktion: Uppdatera UI
function updateUI() {
    if (cartCounterEl) cartCounterEl.innerText = cartCount;
    if (summaryCountEl) summaryCountEl.innerText = cartCount;
}

// Lyssna på alla "Köp nu"-knappar
document.querySelectorAll('.js-add-to-cart').forEach(button => {
    button.addEventListener('click', function () {
        // 1. Logik: Öka räknaren och spara
        cartCount++;
        localStorage.setItem('cartCount', cartCount);

        // 2. UI-uppdatering
        updateUI();

        // 3. Micro-interaktion (Visuell feedback)
        const originalText = this.innerText;
        this.innerText = "✓ Tillagd!";
        this.style.backgroundColor = "#10B981"; // Grön färg

        // Återställ knappen efter 1.5 sekunder
        setTimeout(() => {
            this.innerText = originalText;
            this.style.backgroundColor = "";
        }, 1500);
    });
});

// Kör direkt vid sidladdning
updateUI();