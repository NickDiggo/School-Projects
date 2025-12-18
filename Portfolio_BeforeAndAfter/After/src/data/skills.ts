import type {ISkills} from '../models/ISkills.ts'

const skills: ISkills[] = [
  {
    id: '1',
    name: 'HTML5',
    category: 'frontend',
    level: 5,
    details: [
      'HTML5 is de standaardtaal voor het structureren van webpagina’s en het gebruik van semantische elementen.',
      'Het maakt het mogelijk om forms, multimedia en interactieve content op websites toe te voegen.',
    ],
  },
  {
    id: '2',
    name: 'CSS3',
    category: 'frontend',
    level: 5,
    details: [
      'CSS3 wordt gebruikt voor het stylen en vormgeven van webpagina’s.',
      'Met Flexbox en Grid kunnen layouts flexibel en responsief worden opgebouwd.',
    ],
  },
  {
    id: '3',
    name: 'JavaScript',
    category: 'frontend',
    level: 5,
    details: [
      'JavaScript voegt interactiviteit toe aan websites en kan DOM-elementen manipuleren.',
      'Het ondersteunt moderne features zoals ES6, fetch API en event-driven programming.',
    ],
  },
  {
    id: '4',
    name: 'TypeScript',
    category: 'frontend',
    level: 4,
    details: [
      'TypeScript is een superset van JavaScript die typeveiligheid en interfaces biedt.',
      'Het helpt bij het opsporen van fouten tijdens het ontwikkelen en maakt code beter onderhoudbaar.',
    ],
  },
  {
    id: '5',
    name: 'React',
    category: 'frontend',
    level: 5,
    details: [
      'React is een JavaScript library voor het bouwen van interactieve UI-componenten.',
      'Het maakt gebruik van state, props en hooks om dynamische webapplicaties te bouwen.',
    ],
  },
  {
    id: '6',
    name: 'C#',
    category: 'backend',
    level: 4,
    details: [
      'C# is een programmeertaal voor het bouwen van applicaties op het .NET-platform.',
      'Het ondersteunt objectgeoriënteerd programmeren, LINQ en webapplicaties via ASP.NET Core.',
    ],
  },
  {
    id: '7',
    name: 'Unity',
    category: 'game',
    level: 3,
    details: [
      'Unity is een game-engine waarmee 2D en 3D games ontwikkeld kunnen worden.',
      'Het biedt tools voor scene management, physics en scripting in C#.',
    ],
  },
  {
    id: '8',
    name: 'SQL',
    category: 'backend',
    level: 4,
    details: [
      'SQL is een taal voor het beheren en opvragen van data in relationele databases.',
      'Met SQL kun je queries schrijven, joins uitvoeren en stored procedures maken.',
    ],
  },
]

export default skills
