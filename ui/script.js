// 1. Hämta varukorgen (Notera V3!)
let cart = JSON.parse(localStorage.getItem('techCartV3')) || [];

// 2. Hämta HTML-element
const cartCounterEl = document.getElementById('cart-counter');
const summaryCountEl = document.getElementById('summary-count');
const cartItemsEl = document.getElementById('cart-items-list');
const cartTotalEl = document.getElementById('cart-total-sum');
const checkoutForm = document.getElementById('checkout-form');
const checkoutMain = document.getElementById('checkout-main');
const submitBtn = document.getElementById('submit-btn');

// 3. Funktion: Uppdatera UI och rita ut varukorgen
function updateUI() {
    // Räkna ut totalt antal produkter
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    // Uppdatera headern
    if (cartCounterEl) cartCounterEl.innerText = totalItems;
    if (summaryCountEl) summaryCountEl.innerText = totalItems;

    // Kassan (page2.html)
    if (cartItemsEl) {
        cartItemsEl.innerHTML = '';
        let totalSum = 0;

        if (cart.length === 0) {
            cartItemsEl.innerHTML = '<div class="empty-state">Varukorgen är tom.</div>';
            if (submitBtn) submitBtn.disabled = true; // Stäng av köpknappen
        } else {
            if (submitBtn) submitBtn.disabled = false; // Slå på köpknappen

            cart.forEach((item, index) => {
                const itemTotal = item.price * item.quantity;
                totalSum += itemTotal;

                cartItemsEl.innerHTML += `
                    <div class="cart-item">
                        <div class="cart-item-info">
                            <span><strong>${item.quantity}x</strong> ${item.name}</span>
                            <button class="btn-remove js-remove-item" data-index="${index}">Ta bort</button>
                        </div>
                        <span>${itemTotal} kr</span>
                    </div>
                `;
            });
        }

        if (cartTotalEl) cartTotalEl.innerText = `${totalSum} kr`;

        // Lägg till funktion på "Ta bort"-knapparna
        document.querySelectorAll('.js-remove-item').forEach(button => {
            button.addEventListener('click', function () {
                const index = this.getAttribute('data-index');
                cart.splice(index, 1); // Ta bort varan från listan
                localStorage.setItem('techCartV3', JSON.stringify(cart)); // Spara om
                updateUI(); // Uppdatera skärmen direkt
            });
        });
    }
}

// 4. Lyssna på "Köp nu"-knapparna på startsidan
document.querySelectorAll('.js-add-to-cart').forEach(button => {
    button.addEventListener('click', function () {
        const id = this.getAttribute('data-id');
        const name = this.getAttribute('data-name');
        const price = parseInt(this.getAttribute('data-price'));

        const existingItem = cart.find(item => item.id === id);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ id, name, price, quantity: 1 });
        }

        localStorage.setItem('techCartV3', JSON.stringify(cart));
        updateUI();

        // Visuell bekräftelse på knappen
        const originalText = this.innerText;
        this.innerText = "✓ Tillagd!";
        this.style.backgroundColor = "#10B981";

        setTimeout(() => {
            this.innerText = originalText;
            this.style.backgroundColor = "";
        }, 1500);
    });
});

// 5. Hantera utcheckningen ("Slutför köp")
if (checkoutForm) {
    checkoutForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Stoppa sidan från att ladda om

        if (cart.length === 0) return;

        // Fånga upp kundens namn från formuläret
        const customerNameInput = document.getElementById('name');
        const customerName = customerNameInput ? customerNameInput.value : "kund";

        // Töm varukorgen
        cart = [];
        localStorage.removeItem('techCartV3');
        updateUI();

        // Byt ut hela kassan mot ett PERSONLIGT Tack-meddelande
        if (checkoutMain) {
            checkoutMain.innerHTML = `
                <div class="success-message">
                    <h2>🎉 Tack för din order, ${customerName}!</h2>
                    <p>Vi packar dina varor direkt. En bekräftelse (påhittad) har skickats till din e-post.</p>
                    <a href="index.html" class="btn btn-primary">Tillbaka till butiken</a>
                </div>
            `;
        }
    });
}

// Körs alltid när sidan laddas
updateUI();