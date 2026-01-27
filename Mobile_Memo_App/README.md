De Memo App Mobile is een mobiele applicatie ontwikkeld met React Native (Expo) waarmee gebruikers memo’s kunnen aanmaken, beheren en organiseren via mappen en tags.

De app is ontworpen als een moderne digitale notitie-app waarbij gebruikers niet alleen tekst kunnen opslaan, maar ook opmerkingen en afbeeldingen kunnen toevoegen.

Dit project werd gemaakt binnen mijn opleiding Graduaat Programmeren en focust op mobiele ontwikkeling met native features en cloud integratie.

🚀 App Flow

De applicatie volgt een duidelijke gebruikersflow:

✅ App Start

Bij het opstarten controleert de app of de gebruiker reeds is ingelogd.

Niet ingelogd → Login scherm

Ingelogd → Memo overzicht

🔑 Login / Register

Gebruikers kunnen:

Inloggen met e-mail en wachtwoord

Een nieuw account registreren

Na succesvolle authenticatie wordt de gebruiker doorgestuurd naar het memo overzicht.

📂 Memo Overzicht

Memo’s worden automatisch gegroepeerd per map.

Vanuit dit scherm kan de gebruiker:

Een nieuwe memo aanmaken

Naar de settings navigeren

➕ Nieuwe Memo

Bij het aanmaken van een memo kan de gebruiker:

Titel en content invullen

Eén map selecteren

Meerdere tags toevoegen

Optioneel content toevoegen via speech-to-text

De memo wordt daarna opgeslagen in de database.

📄 Memo Detail

In dit scherm kan de gebruiker memo-details bekijken zoals:

Titel en inhoud

Afbeeldingen

Opmerkingen/comments

Beschikbare acties:

Memo bewerken

Memo verwijderen

Afbeelding toevoegen

Opmerking toevoegen

✏️ Memo Bewerken

Gebruikers kunnen:

Titel aanpassen

Content wijzigen

De wijzigingen worden onmiddellijk opgeslagen.

⚙️ Settings

In de settings kan de gebruiker mappen en tags beheren:

Toevoegen

Aanpassen

Verwijderen

Daarnaast is uitloggen ook mogelijk.

🤳 Native Modules & Gestures

De mobiele versie maakt gebruik van meerdere native functionaliteiten.

📷 Camera Module

De camera wordt gebruikt om afbeeldingen toe te voegen aan memo’s.

Foto’s worden genomen via de native camera

Upload gebeurt via Supabase Storage

🎤 Speech-to-Text

Tijdens het aanmaken van een memo kan de gebruiker gesproken input toevoegen.

Native speech recognition zet spraak om naar tekst

🖐️ Gestures

De app bevat verschillende gesture-interacties voor een gebruiksvriendelijke ervaring.

Long Press

Mappen en tags beheren

Afbeeldingen en opmerkingen verwijderen

Swipe Gestures

Navigeren tussen afbeeldingen in fullscreen mode

Tap vs Long Press

Tap: item openen

Long press: item verwijderen

📚 Gebruikte Libraries
Library	Functie
expo-router	Navigatie tussen schermen
nativewind	Styling met Tailwind CSS in React Native
react-native-gesture-handler	Gesture ondersteuning
react-native-reanimated	Animaties en gesture handling
☁️ Online Services
Supabase

Supabase wordt gebruikt voor:

Authenticatie (login, register, logout)

Database opslag (memo’s, tags, mappen, opmerkingen)

Storage voor afbeeldingen

📦 APK Installatiebestand

Voor dit project is er ook een ondertekende APK toegevoegd aan deze repository.
Hiermee kan de applicatie eenvoudig geïnstalleerd worden op een Android-toestel zonder dat de broncode lokaal moet worden uitgevoerd.