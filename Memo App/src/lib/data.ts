export interface Comment {
  id: string
  text: string
  createdAt: Date
}

export interface Memo {
  id: string
  title: string
  content: string
  folderId: string
  createdAt: Date
  comments?: Comment[]
  photos?: string[]
}

export interface Folder {
  id: string
  name: string
  color: string
}

export const folders: Folder[] = [
  {id: '1', name: 'Persoonlijk', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'},
  {id: '2', name: 'Werk', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'},
  {id: '3', name: 'Ideeën', color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'},
  {id: '4', name: 'Taken', color: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400'},
]

export const memos: Memo[] = [
  {
    id: '1',
    title: 'Boodschappenlijst',
    content: 'Melk, brood, kaas, fruit, groenten voor de week. Niet vergeten: koffie en thee aanvullen.',
    folderId: '1',
    createdAt: new Date('2024-01-15'),
    comments: [
      {id: 'c1', text: 'Extra aandachtspunt: kijk of er aanbiedingen zijn', createdAt: new Date('2024-01-16')},
    ],
    photos: ['/colorful-grocery-aisle.png'],
  },
  {
    id: '2',
    title: 'Project Deadline',
    content: 'Presentatie voorbereiden voor Q1 review. Slides maken, data analyseren, en team briefen voor vrijdag.',
    folderId: '2',
    createdAt: new Date('2024-01-14'),
  },
  {
    id: '3',
    title: 'App Idee',
    content: "Een app voor het bijhouden van planten water geven. Notificaties, foto's van groei, en verzorgingstips.",
    folderId: '3',
    createdAt: new Date('2024-01-13'),
    photos: ['/plant-app-mockup.jpg'],
  },
  {
    id: '4',
    title: 'Vergadering Notities',
    content: 'Team standup: Sprint planning volgende week. Focus op gebruikersfeedback implementeren en bugs fixen.',
    folderId: '2',
    createdAt: new Date('2024-01-12'),
  },
  {
    id: '5',
    title: 'Vakantie Planning',
    content: 'Zomervakantie: Zuid-Frankrijk, 2 weken. Hotels bekijken, vluchten boeken, auto huren.',
    folderId: '1',
    createdAt: new Date('2024-01-11'),
  },
  {
    id: '6',
    title: 'Boek Ideeën',
    content: 'Interessante boeken om te lezen: "Atomic Habits", "Deep Work", "The Creative Act".',
    folderId: '3',
    createdAt: new Date('2024-01-10'),
  },
]

export function getMemosByFolder(folderId: string): Memo[] {
  return memos.filter(memo => memo.folderId === folderId)
}

export function getMemoById(id: string): Memo | undefined {
  return memos.find(memo => memo.id === id)
}
