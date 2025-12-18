# Restaurant Reserveringssysteem

## Projectbeschrijving

Dit project is een innovatief webplatform voor een restaurant, ontworpen om zowel klanten als medewerkers te ondersteunen. Het vervangt de traditionele manier van reserveren, bestellen en afrekenen, en biedt een efficiënte en geautomatiseerde workflow voor alle betrokken rollen: klanten, zaalverantwoordelijke, ober, kok en eigenaar.

Het systeem biedt onder andere:

- Online reserveringen en tafelbeheer
- Online bestellingen van gerechten en dranken
- Rollen- en rechtenbeheer voor medewerkers
- Automatische e-mailnotificaties (bevestigingen, welkomstmails, enquêtes)
- Overzichten en rapportages (omzet, reserveringen, feedback)
- Veiligheid en betrouwbaarheid door gebruik van HTTPS en encrypted gegevensopslag
- **Supabase** voor data-opslag
- **SignalR** voor live updates in de applicatie (bijv. bestellingen en tafelstatussen in realtime)

---

## Functionaliteiten per gebruiker

### Klanten

- Account aanmaken, beheren of verwijderen
- Wachtwoord resetten
- Tafels reserveren en annuleren
- Online bestellingen plaatsen voor eten en drinken
- Ontvangen van e-mailbevestigingen en welkomstmails
- Reviews en enquêtes invullen na bezoek

### Zaalverantwoordelijke

- Tafels toewijzen en beheren via plattegrond
- Reserveringen bevestigen en controleren bij binnenkomst
- Facturen afrekenen en verzenden via e-mail
- Overzichten van tafelstatus en lopende reserveringen

### Ober

- Inkomende bestellingen van dranken en gerechten bekijken
- Dranken beheren (toevoegen, wijzigen, verwijderen)
- Bestellingen afhandelen en leveren
- Realtime updates van bestellingen via SignalR

### Kok

- Menu beheren: gerechten toevoegen, wijzigen, verwijderen
- Inkomende bestellingen van gerechten verwerken
- Speciale dieetwensen en allergieën beheren
- Live overzicht van binnenkomende bestellingen via SignalR

### Eigenaar

- Medewerkers en rollen beheren
- Alle functionaliteiten van zaalverantwoordelijke gebruiken
- Overzichten van reserveringen, omzet en feedback bekijken en exporteren
- E-mailtemplates en nieuwsbrieven beheren

---

## Technische aspecten

### Datalaag

- Gebruik van **Supabase** als database voor alle entiteiten:
  - Community
  - Event
  - Gebruiker
  - Inschrijving
- Realtime updates met **SignalR**
- UnitOfWork en repositories voor gestructureerde data-operaties

### Security

- Identity voor gebruikersbeheer
- JWT voor authenticatie en autorisatie

---

## Screenshots

### Homepage

![Homepage](IMG/homepage.png)

### CRUD scherm

![CRUD scherm](IMG/crud.png)
