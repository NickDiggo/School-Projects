export interface ISkills {
  id: string
  name: string
  category: 'frontend' | 'backend' | 'game'
  details: string[]
  level: number
}
