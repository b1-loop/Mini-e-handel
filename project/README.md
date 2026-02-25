# TechPrylar - Mini E-handel 🛒

## 1. Problem Statement
**Vad är problemet?** Många e-handelsplattformar är överfulla med reklam, komplexa menyer och långsamma utcheckningsprocesser. Användare vill ofta bara snabbt hitta en produkt, lägga den i varukorgen och betala.
**Varför behövs lösningen?** TechPrylar löser detta genom att erbjuda en avskalad, "no-nonsense" e-handel där fokus ligger på snabbhet, tydlighet och en friktionsfri köpresa.

## 2. Stakeholders
* **Guest (Gäst):** Vill browsa produkter och se priser utan att behöva skapa ett konto.
* **Customer (Kund):** Vill kunna lägga till i varukorg och genomföra ett smidigt köp.
* **Admin (Administratör):** Behöver kunna uppdatera lagersaldo och lägga till nya produkter (utanför MVP-scopet, men viktig för framtiden).

## 3. Kravlista & Prioritering (MoSCoW)
**Funktionella krav:**
1.  **[Must]** Systemet ska visa en lista med produkter (bild, namn, pris).
2.  **[Must]** Användaren ska kunna lägga till en produkt i varukorgen.
3.  **[Must]** Systemet ska visa antalet varor i varukorgen i headern.
4.  **[Must]** Användaren ska kunna gå till en utcheckningssida (Checkout).
5.  **[Should]** Användaren ska kunna fylla i sina leveransuppgifter.

**Icke-funktionella krav:**
6.  **[Must - Usability]** Gränssnittet ska vara responsivt (Mobile-first).
7.  **[Must - Accessibility]** Sidan ska använda semantisk HTML och ha hög kontrast för läsbarhet.
8.  **[Should - Performance]** UI-interaktioner (som att lägga till i varukorg) ska ske utan att sidan laddas om (Client-side JS).

## 4. Use Case: Lägg till produkt i varukorg
* **Actor:** Guest / Customer
* **Preconditions:** Användaren befinner sig på startsidan (`index.html`) och ser produktlistan.
* **Main flow:**
    1. Användaren klickar på knappen "Köp" på en specifik produkt.
    2. Systemet fångar klicket via JavaScript.
    3. Systemet uppdaterar varukorgens räknare i headern (+1).
    4. Systemet visar en kort visuell bekräftelse (toast/knapp-animering).
* **Alternate flow:** 1a. Om produkten är slut i lager är "Köp"-knappen inaktiv (disabled) och klicket registreras inte.
* **Postconditions:** Produkten finns representerad i systemets varukorg (LocalStorage i prototypen) och UI:t är uppdaterat.

## 5. Change Note (Utvecklingslogg)
1.  **Ändring:** Tog bort kravet på "Användarinloggning".
    * *Varför:* Insåg att det bröt mot "keep it simple"-principen. Ett gäst-checkout-flöde är mer realistiskt för en mini-leverans.
2.  **Ändring:** Ändrade från en fullständig varukorgssida till att bygga varukorgen direkt in i Checkout-sidan (`page2.html`).
    * *Varför:* För att minska antalet klick för användaren och hålla nere antalet HTML-filer enligt kravspecifikationen.

## 6. VG: Reflektion & Designval
* **Designval (UML):** Jag valde ett sekvensdiagram utöver klassdiagrammet för att det tydligast visar asynkroniteten och interaktionen mellan Användare, UI och Data (LocalStorage) just för varukorgsflödet. Det är där den kritiska logiken ligger.
* **Designval (UI):** UI-strukturen är byggd på CSS Grid för produktlistan för att säkerställa att korten alltid linjerar upp snyggt, vilket ger en professionell "produktkänsla". 
* **Risker & Begränsningar:** Den nuvarande arkitekturen använder LocalStorage. En stor säkerhetsrisk i en riktig applikation är att pris och kundvagn hanteras på klientsidan (client-side manipulation). I en framtida version (förbättring) måste prisvalidering och lagersaldo verifieras mot en säker backend (Server) innan betalning går igenom.