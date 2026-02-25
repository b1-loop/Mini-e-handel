# AI Log

**Prompt 1:** "Help me create a class diagram in PlantUML for a mini e-commerce site with products, categories, and a shopping cart."
* **Vad AI gav:** Ett gigantiskt diagram med över 10 klasser inklusive Payments, ShippingProviders, och UserProfiles.
* **Vad du ändrade manuellt:** Jag raderade överflödiga klasser, behöll endast de fyra mest relevanta (Product, Cart, CartItem, Customer) samt en Enum för att säkerställa att diagrammet uppfyllde "keep it simple"-regeln och MVP-scopet.

**Prompt 2:** "Write semantic HTML and CSS for a modern product card with an image placeholder, title, price, and a buy button."
* **Vad AI gav:** En fin design, men HTML-strukturen bestod enbart av `<div>`-taggar ("div-soup").
* **Vad du ändrade manuellt:** Jag skrev om strukturen så att själva kortet blev en `<article>` och lade den inuti en `<section>` för att uppfylla det specifika kravet om semantisk HTML (Accessibility).

**Prompt 3:** "Write a short javascript code to handle adding items to a shopping cart using localstorage."
* **Vad AI gav:** En väldigt komplex lösning som sparade hela JSON-objekt för produkter och beräknade totalsummor iterativt.
* **Vad du ändrade manuellt:** Jag bantade ner scriptet (till under 40 rader) så att det enbart hanterar en simpel räknare (integer) i LocalStorage och uppdaterar DOM:en. Jag lade också manuellt till en visuell micro-interaktion (knappen blir grön).

**Reflektion:**
AI är ett fantastiskt verktyg för att snabbt få fram "boilerplate"-kod och designinspiration (CSS). Vad jag har lärt mig är dock att AI ofta har en tendens att "överarbeta" problem; man måste ha en stark kravspecifikation och vara hård med saxen för att hålla projektet litet, fokuserat och säkert.