# itc1-csharp-bugfixing

De opdracht bestond uit het analyseren van een bestaande applicatie waarin meerdere bugs en foutieve implementaties waren verwerkt. Het doel was om deze fouten systematisch op te sporen, te debuggen en aan te passen zodat de applicatie opnieuw correct functioneert volgens de vooropgestelde vereisten.

Tijdens deze opdracht hebben we onder andere gewerkt aan:

Het interpreteren van bestaande codebases

Debugging en probleemoplossend denken

Correct toepassen van objectgeoriënteerde principes

Verbeteren van constructors, properties en methodes

Controleren van logica en outputformatting

Alle opgeloste fouten werden gedocumenteerd in deze README met vermelding van het bestand en het aangepaste regelnumer.

Deze opdracht was een waardevolle oefening in het onderhouden en verbeteren van bestaande software, een essentiële vaardigheid binnen professionele softwareontwikkeling.

## Studenten

- Nick Tuymans (r0333915)
- Joeri Van De Weyer (r0288837)

## Opgeloste fouten

Maak hier een lijst van de fouten die je opgelost hebt. Noteer bij elke fout het bestand en de regelnummer (ongeveer is goed) waar je een aanpassing hebt gedaan.
Bijvoorbeeld `Program.cs:20` (Het woord opgove aangepast naar opgave)

0. Program.cs:20 - Het woord opgove aangepast naar opgave

## Screenshots

Het overzicht van de **moederborden** moet er als volgt uit zien:

```
Kies een moederbord:

1. Moederbord: Socket AM4 - Chipset AMD B550 - Formfactor ATX - Geheugentype DDR4
2. Moederbord: Socket AM7 - Chipset AMD B550 - Formfactor ATX - Geheugentype DDR4
3. Moederbord: Socket AM9 - Chipset AMD B550 - Formfactor ATX - Geheugentype DDR5
4. Moederbord: Socket AM3 - Chipset AMD B550 - Formfactor ATX - Geheugentype DDR5
```

Het overzicht van de **Processoren** moet er als volgt uit zien:

```
Kies een processor:

1. Processor: Merk AMD - Socket AM4 - 8 cores  - 12 threads - 34 MHz
2. Processor: Merk AMD - Socket AM5 - 8 cores  - 12 threads - 34 MHz
3. Processor: Merk AMD - Socket AM5 - 8 cores  - 12 threads - 38 MHz
4. Processor: Merk AMD - Socket AM5 - 0 cores  - 16 threads - 50 MHz
5. Processor: Merk AMD - Socket AM5 - 8 cores  - 12 threads - 34 MHz
6. Processor: Merk AMD - Socket AM7 - 8 cores  - 12 threads - 34 MHz
7. Processor: Merk AMD - Socket AM7 - 4 cores  - 12 threads - 40 MHz
8. Processor: Merk AMD - Socket AM7 - 8 cores  - 8 threads - 38 MHz
```

Het overzicht van de **geheugens** moet er als volgt uit zien:

```
Kies een geheugen:

1. Geheugen: DDR4 - 16GB
2. Geheugen: DDR4 - 8GB
3. Geheugen: DDR5 - 16GB
```

Het overzicht van de grafische kaarten moet er als volgt uit zien:

```
Kies een grafische kaart:

1. Chipset: NVIDIA GeForce GTX 1650 - Werkgeheugen 4GB
2. Chipset: Gigabyte GeForce RTX 4080 - Werkgeheugen 16GB
```

Na het kiezen van alle onderdelen (optie 1 bij alles), moet je deze output krijgen:

```
Jouw pc:
Geheugen: Geheugen: DDR4 - 16GB
Moederbord: Moederbord: Socket AM4 - Chipset AMD B550 - Formfactor ATX - Geheugentype DDR4
Processor: Processor: Merk AMD - Socket AM4 - 8 cores  - 12 threads - 34 MHz
Grafische kaart: Chipset: NVIDIA GeForce GTX 1650 - Werkgeheugen 4GB
Prijs PC: 18.979,00 euro
```

Het overizicht van de muizen moet er als volgt uit zien:

```
Kies een muis:

1. Muis: Merk Trust - Model Carve - Draadloos Nee - RGB Verlichting Nee - Prijs: 799 euro - Aantal instellingen 1 - Max DPI 1200
2. Muis: Merk Logitech - Model M705 - Draadloos Ja - RGB Verlichting Nee - Prijs: 3499 euro - Aantal instellingen 1 - Max DPI 900
3. Muis: Merk Steelseries - Model Rival 600 - Draadloos Nee - RGB Verlichting Ja - Prijs: 6120 euro - Aantal instellingen 5 - Max DPI 12000
4. Muis: Merk Razer - Model DeathAdder V2 - Draadloos Nee - RGB Verlichting Ja - Prijs: 6299 euro - Aantal instellingen 5 - Max DPI 20000
5. Muis: Merk Corsair - Model Nightsword - Draadloos Nee - RGB Verlichting Ja - Prijs: 8490 euro - Aantal instellingen 5 - Max DPI 18000
```

Het overzicht van de toetsenborden moet er als volgt uit zien:

```
Kies een toetsenbord:

1. Toetsenbord: Merk Steelseries - Model Apex 3 TKL - Draadloos Nee - RGB Verlichting Ja - Prijs: 3999 euro - Layout QWERTY - Mechanisch Nee
2. Toetsenbord: Merk Fuegobird - Model K3 - Draadloos Ja - RGB Verlichting Ja - Prijs: 4050 euro - Layout QWERTY - Mechanisch Ja
3. Toetsenbord: Merk Razer - Model Huntsman mini - Draadloos Nee - RGB Verlichting Ja - Prijs: 11995 euro - Layout QWERTY - Mechanisch Nee
4. Toetsenbord: Merk Corsair - Model K55 RGB Pro - Draadloos Nee - RGB Verlichting Ja - Prijs: 6490 euro - Layout QWERTY - Mechanisch Nee
```

Na het kiezen van een muis en toetsenbord (optie 1 bij elk), moet je deze output krijgen:

```
Jouw accessoires:
Muis: Merk Trust - Model Carve - Draadloos Nee - RGB Verlichting Nee - Prijs: 799 euro - Aantal instellingen 1 - Max DPI 1200
Toetsenbord: Merk Steelseries - Model Apex 3 TKL - Draadloos Nee - RGB Verlichting Ja - Prijs: 3999 euro - Layout QWERTY - Mechanisch Nee
Prijs accesoires: 4.798,00
```

Het overizicht van de software moet er als volgt uit zien:

```
Kies een software:

1. Naam Photoshop elements
2. Naam Microsoft office 2019
3. Naam Norton antivirus 360 Deluxe
4. Naam Baldur's gate 3 - Aantal spelers 1 - Minimaal werkgeheugen 8GB
5. Naam God of war - Aantal spelers 1 - Minimaal werkgeheugen 4GB
6. Naam Age of empires IV - Aantal spelers 4 - Minimaal werkgeheugen 4GB
```

Na het kiezen van software (optie 1 is gekozen), moet je deze output krijgen:

```
Jouw softwarepakket:
Naam Photoshop elements
Prijs software: 9.999,00
```

Op het einde van de applicatie krijg je de totaalprijs te zien:

```
Totale prijs aankoop: 33776
```

**OPGELET**: Indien je verschillen opmerkt met punten en komma's, mag je deze negeren. Bij twijfel vraag je de docent om even mee te kijken.

---

Debug Log

LAST EDIT: 13/12 14:00

I. Accessoire.cs => LINE 40

public double Prijs
{
get { return \_prijs; }
set
{
if (value < 0)
\_prijs = 0;
else
\_prijs = value;
}
}

[IPV VALUE > 0]

---

II. Toetsenbord.cs => LINE 27

public Toetsenbord(string merk, string model, bool isDraadloos, bool heeftRgbVerlichting, double prijs, string layout, bool isMechanisch)
: base(merk, model, isDraadloos, heeftRgbVerlichting, prijs)
{
Layout = layout;
IsMechanisch = isMechanisch;
}

[volgorde parameter 4-5 veranderd in constructor subklasse]

---

III. Program.cs => LINE 2

ToonTitel("PC Samenstellen");

[IPV ToonTitle]

---

IV. Program.cs => LINE 122

Moederbord KiesMoederbord()
{
ToonKeuzeTitel("Moederbord");

    List<Moederbord> moederborden = FileOperations.FilterMoederborden();

[IPV .FilterProcessen]

---

V. .csproj => LINE 5

<TargetFramework>net8.0</TargetFramework>

[IPV 6.0]

---

VI. Program.cs => LINE 235

int VraagKeuzeMetMaximum(int maximum)
{
string invoer;
int keuze;
do
{
Console.Write("Uw keuze: ");
invoer = Console.ReadLine();
} while (!int.TryParse(invoer, out keuze) || keuze < 1 || keuze > maximum);
return keuze;
}

---

VII. Program.cs => LINE 220

Software KiesSoftware()
{
ToonKeuzeTitel("software");

    List<Software> softwareLijst = FileOperations.LeesSoftware();

    for (int i = 0; i < softwareLijst.Count; i++)
        Console.WriteLine($"{i + 1}. {softwareLijst[i]}");

[IPV softwareLijst i + 1]

---

VIII. Pc.cs => LINE 37

public Pc(Geheugen geheugen, Moederbord moederbord, Processor processor, GrafischeKaart grafischeKaart)
{
Geheugen = geheugen;
Moederbord = moederbord;
Processor = processor;
GrafischeKaart = grafischeKaart;
}

[was missing]

---

IX. Program.cs => LINE 23

else
aankoop.Pc = new Pc(aankoop.Pc.Geheugen, aankoop.Pc.Moederbord, aankoop.Pc.Processor, aankoop.Pc.GrafischeKaart);
}

[werd aangemaakt voor in te vullen properties aangemaakt werden]

---

X. Aankoop.cs => LINE 37

// public Aankoop()
// {
// Accessoires = new List<Accessoire>();
// Software = new List<Software>();
// }

        // // Complete constructor
        // public Aankoop(Pc pc, List<Accessoire> accessoires, List<Software> software)
        // {
        //     Pc = pc ?? throw new ArgumentNullException(nameof(pc)); // Ensure Pc is not null
        //     Accessoires = accessoires ?? new List<Accessoire>();    // Default to empty list if null
        //     Software = software ?? new List<Software>();            // Default to empty list if null

[was maar 1 zeer beperkt constructor voorzien]

---

XI. Geheugen.cs => LINE 23

public int ModuleGrootte
{
get { return \_moduleGrootte; }
set { \_moduleGrootte = value; }
}

[IPV _module = Module]

---

XII. GrafischeKaart.cs => LINE 23

public int Werkgeheugen
{
get { return \_werkgeheugen; }
set { \_werkgeheugen = value; }
}

[IPV value=_werkgeheugen]

---

XIII. Aankoop.cs => LINE 72

public double BerekenTotalePrijs()
{
double totalePrijs = Pc.TotaalPrijs();
Accessoires.ForEach(a => totalePrijs += a.Prijs);
Software.ForEach(s => totalePrijs += s.Prijs);
return totalePrijs;
}

[overwrites in foreach instead of adding]

---

XIV. PC.cs => LINE 46

public bool ControleerOnderdelen()
{
if(Moederbord==null || Processor==null || Geheugen==null)
return false;
if (Moederbord.Socket != Processor.Socket)
return false;

            if (Moederbord.GeheugenType != Geheugen.Type)
                return false;

            return true;
        }

[IPV ommitting first if ]

---

XV. Processor.cs => LINE 55

public Processor(string merk, string socket, int aantalCores, int aantalThreads, double klokFrequentie, double prijs) : base(prijs)
{
this.Merk = merk;
this.Socket = socket;
this.AantalCores = aantalCores;
this.AantalThreads = aantalThreads;
this.KlokFrequentie = klokFrequentie;
}

[IPV addressing private attributes]

---

XVI. Software.cs => LINE 29

public Software(string naam, double prijs)
{
this.Naam = naam;
this.Prijs = prijs;
}

[IPV private attr]

---

XVII. FileOperations.cs => LINE 138

public static List<Accessoire> LeesAccesoires()
{
List<Accessoire> accessoires = new List<Accessoire>();

            using (StreamReader reader = new StreamReader(BestandAccessoires))
            {
                while (!reader.EndOfStream)
                {
                    string[] accessoireGegevens = reader.ReadLine().Split(';');
                    // accessoireGegevens = reader.ReadLine().Split(';');
                    Accessoire accessoire = null;

[ommitable line in comment //]

---

XVIII. FileOperations.cs => LINE 154

switch (accessoireType)
{
case "muis":
int aantalInstellingen = int.Parse(accessoireGegevens[6]);
int maxDpi = int.Parse(accessoireGegevens[7]);
// string watDoetDitHier = accessoireGegevens[8];

[omittable line in comment //]

---

XIX Aankoop.cs => LINE 72

public double BerekenTotalePrijs()
{
double totalePrijs = Pc.TotaalPrijs();
Accessoires?.ForEach(a => totalePrijs += a.Prijs);
Software?.ForEach(s => totalePrijs += s.Prijs);
return totalePrijs;
}
}

[Accessoires? IPV zonder ?, alsook software]

---

XX. Program.cs => LINE 41

string optieMuis = KeuzeOptie("muis");
while (optieMuis.ToLower() == "ja")
{
Muis muis = KiesMuis();
aankoop.VoegAccessoireToe(muis);

    Console.WriteLine();
        optieMuis = KeuzeOptie("muis");

}

[optieMuis = .....]

---

XXI. Accessoire.cs => LINE 66

    public override string ToString()
        {
            string draadloos = IsDraadloos ? "Ja" : "Nee";
            string rgbverlichting = HeeftRgbverlichting ? "Ja" : "Nee";
            return $"Merk {Merk} - Model {Model} - Draadloos {draadloos} - RGB Verlichting {rgbverlichting} - Prijs {Prijs}";
        }

[IPV in ToString Muis.cs]

---

XXII. Onderdeel.cs => LINE 15

public double Prijs
{
get { return \_prijs; }
set { \_prijs = value; }
}

[IPV Prijs]

---

XXIII. Program.cs => LINE 5

Aankoop aankoop = null;

aankoop = new Aankoop();
aankoop.Pc = new Pc();

[declareren om daarna überhaupt op te kunnen vullen]

---
