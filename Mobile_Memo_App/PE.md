# Permanente evaluatie

**Vul hieronder verder aan zoals beschreven in de [projectopgave](https://javascript.pit-graduaten.be/evaluatie/mobile/pe.html).**

## Scherm 1

Op de homepagina krijgt de gebruiker een overzicht van alle ingestelde gewoontes. Bovenaan wordt weergegeven hoeveel gewoontes reeds voltooid zijn (“1 van 5 voltooid vandaag”). De voortgangsbalk toont de huidige XP-stand en de progressie naar het volgende level. Wanneer een gewoonte voltooid wordt, wordt de XP-balk dynamisch geanimeerd met een Reanimated withTiming animatie. Ook wordt de lijst automatisch bijgewerkt met het nieuwe voltooiingspercentage. Via een knop kan de gebruiker een nieuwe gewoonte toevoegen. Dit scherm is de centrale hub van de applicatie.


![Screenshot_HP.png](assets/images/Screenshot_HP.png)


## Scherm 2

Op de detailpagina wordt weergegeven waar de gewoonte precies uit bestaat, inclusief beloning, moeilijkheidsgraad en beschrijving. De gebruiker kan hier de gewoonte als voltooid markeren, waarna de XP-waardes worden aangepast en text-to-speech wordt geactiveerd met een random quote die via een API wordt opgehaald. Er is een voortgangsbalk die toont hoe vaak de gewoonte deze week voltooid werd. De gebruiker kan optioneel een notitie toevoegen, bijvoorbeeld reflecties of opmerkingen over de uitvoering van de habit. Dit scherm zorgt ervoor dat elke gewoonte afzonderlijk beheerd kan worden.

![Screenshot_HItem.png](assets/images/Screenshot_HItem.png)

## Scherm 3

Op dit scherm kan de gebruiker foto’s nemen van zijn eigen fysieke progressie en deze opslaan in een fotobibliotheek binnen de app. De native module Expo Camera wordt gebruikt om foto's te maken en lokaal op te slaan. Gebruikers kunnen door eerdere foto’s bladeren en deze in volledig scherm bekijken. Via gestures kunnen foto’s worden vergroot met een tap-gesture en kan met een swipe-gesture naar de volgende foto worden genavigeerd. Dit scherm maakt het mogelijk om visueel de evolutie van de gewoontes te volgen.

## Scherm 4

In het instellingenmenu kan de gebruiker verschillende functies van de app in- en uitschakelen. Zo kan text-to-speech geactiveerd of gedempt worden, en kan de app worden overgeschakeld naar dag- of nachtmodus. De gebruiker kan ook de volledige lijst van gewoontes bekijken, bewerken of verwijderen. Eventuele toekomstige opties zoals meldingen zullen hier toegevoegd worden.

## Native modules

1. Expo Camera

De expo-camera module wordt gebruikt om foto’s te nemen die door de gebruiker worden opgeslagen in de progressie-library. De module toont een cameravoorvertoning waarmee de gebruiker een profielfoto kan instellen en bijkomende foto’s kan vastleggen. De foto’s worden in de gallerij en in de app opgeslagen en kan in de app weergegeven.

2. Expo Speech

De expo-speech module biedt text-to-speech functionaliteit. Ik gebruik deze module om gesproken feedback te geven wanneer een gewoonte is voltooid. Dit verhoogt de interactie en geeft een positieve ervaring.

## Online services

Voor inspirerende citaten maak ik gebruik van de een API (bv ZenQuotes), een gratis REST-API die willekeurige motivational quotes levert. Wanneer een gewoonte als voltooid wordt gemarkeerd, verschijnt er een pop-up met een quote (bijv. “Success is the sum of small efforts repeated day in and day out”). Deze quote wordt daarna ook uitgesproken via Expo Speech.

## Gestures & animaties

11. Gestures

Tap gesture: foto vergroten en verkleinen in de library.

Swipe gesture: navigeren tussen foto’s in de library.

2. Animaties

Reanimated withTiming: de XP-voortgangsbalk animeert vloeiend wanneer een gewoonte voltooid wordt.
# Feedback

De minimum vereisten van het project worden wel allemaal benoemd, maar de functionaliteit van de vereisten is me niet helemaal logisch. 

Het gebruik van de Camera is niet echt een logische toevoeging in het design van de applicatie, lijkt me ook zeer hard op onze Gallery applicatie.
Speech wel, maar dan moet het goed toegepast worden. Bijvoorbeeld begeleide meditatie. 

Gestures & animaties zijn ook zeer vergelijkend met het lesvoorbeeld van de gallery, dus hier mag nog wel wat meer verschil in komen. 

