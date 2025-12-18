import {useState, type FunctionComponent} from 'react'
import Accordion from './accordion'
import AccordionItem from './accordionItem'
import skills from '../../data/skills.ts'
import PdfModal from './pdfModal.tsx'

const SkillsPage: FunctionComponent = () => {
  const [filter, setFilter] = useState<'all' | 'frontend' | 'backend' | 'game'>('all')

  const filteredSkills = skills.filter(s => filter === 'all' || s.category === filter)

  return (
    <div className="container py-5 text-light">
      <h1 className="mb-4">Mijn Skills</h1>

      {/* Filter Buttons */}
      <div className="mb-3 d-flex justify-content-center gap-2 flex-wrap">
        {['all', 'frontend', 'backend', 'game'].map(cat => (
          <button
            key={cat}
            className={`btn ${filter === cat ? 'btn-dark' : 'btn-outline-light'}`}
            onClick={() => setFilter(cat as 'all' | 'frontend' | 'backend' | 'game')}>
            {cat[0].toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Accordion */}
      <Accordion>
        {filteredSkills.map(skill => (
          <AccordionItem
            key={skill.id}
            openKey={skill.id}
            title={
              <>
                {skill.name} {'★'.repeat(skill.level)}
                {'☆'.repeat(5 - skill.level)}
              </>
            }>
            <ul className="mb-0">
              {skill.details.map((d, idx) => (
                <li key={idx}>{d}</li>
              ))}
            </ul>
          </AccordionItem>
        ))}
      </Accordion>
      <PdfModal />
    </div>
  )
}

export default SkillsPage
