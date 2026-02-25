// 1. Hämta varukorgen (nu en lista med produkter)
let cart = JSON.parse(localStorage.getItem('techCart')) || [];

// 2. Hämta HTML-element
const cartCounterEl = document.getElementById('cart-counter');
const summaryCountEl = document.getElementById('summary-count');
const cartItemsEl = document.getElementById('cart-items-list');
const cartTotalEl = document.getElementById('cart-total-sum');

// 3. Funktion: Uppdatera UI och rita ut varukorgen
function updateUI() {
    // Räkna ut totalt antal produkter
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    // Uppdatera antal i headern
    if (cartCounterEl) cartCounterEl.innerText = totalItems;
    if (summaryCountEl) summaryCountEl.innerText = totalItems;

    // Om vi är på kassasidan (page2.html), rendera produkterna!
    if (cartItemsEl) {
        cartItemsEl.innerHTML = ''; // Rensa gamla listan
        let totalSum = 0;

        if (cart.length === 0) {
            cartItemsEl.innerHTML = '<div class="empty-state">Varukorgen är tom.</div>';
        } else {
            // Loopa igenom varje vara och skapa HTML
            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                totalSum += itemTotal;

                cartItemsEl.innerHTML += `
                    <div class="cart-item">
                        <span>${item.quantity}x ${item.name}</span>
                        <span>${itemTotal} kr</span>
                    </div>
                `;
            });
        }

        // Uppdatera totalsumman
        if (cartTotalEl) cartTotalEl.innerText = `${totalSum} kr`;
    }
}

// 4. Lyssna på "Köp nu"-knapparna på startsidan
document.querySelectorAll('.js-add-to-cart').forEach(button => {
    button.addEventListener('click', function () {
        // Hämta info från knappens data-attribut
        const id = this.getAttribute('data-id');
        const name = this.getAttribute('data-name');
        const price = parseInt(this.getAttribute('data-price'));

        // Kolla om varan redan ligger i varukorgen
        const existingItem = cart.find(item => item.id === id);

        if (existingItem) {
            existingItem.quantity++; // Öka antal
        } else {
            cart.push({ id, name, price, quantity: 1 }); // Lägg till ny
        }

        // Spara den nya listan i LocalStorage och uppdatera sidan
        localStorage.setItem('techCart', JSON.stringify(cart));
        updateUI();

        // Micro-interaktion (Visuell feedback)
        const originalText = this.innerText;
        this.innerText = "✓ Tillagd!";
        this.style.backgroundColor = "#10B981";

        setTimeout(() => {
            this.innerText = originalText;
            this.style.backgroundColor = "";
        }, 1500);
    });
});

// Körs alltid när sidan laddas
updateUI();