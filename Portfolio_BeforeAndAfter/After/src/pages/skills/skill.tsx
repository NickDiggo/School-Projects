import type {FunctionComponent} from 'react'
import type {ISkills} from '../../models/ISkills'

const Skill: FunctionComponent<ISkills> = ({name, level}) => {
  return (
    <div className="skill">
      <strong>{name}</strong> - {'★'.repeat(level)}
      {'☆'.repeat(5 - level)}
    </div>
  )
}

export default Skill
