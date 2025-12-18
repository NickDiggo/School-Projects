import type {FunctionComponent, PropsWithChildren, ReactNode} from 'react'
import {useContext} from 'react'
import {AccordionContext} from './accordion'

interface AccordionItemProps extends PropsWithChildren {
  title: ReactNode
  openKey: string
}

const AccordionItem: FunctionComponent<AccordionItemProps> = ({children, title, openKey}) => {
  const {currentOpenKey, toggleOpenKey} = useContext(AccordionContext)
  const isOpen = currentOpenKey === openKey

  return (
    <div className="accordion-item mb-2 border border-secondary rounded">
      <div
        className="accordion-header p-2 cursor-pointer bg-dark text-light d-flex justify-content-between align-items-center"
        onClick={() => toggleOpenKey(openKey)}>
        <span>{title}</span>
        <span>{isOpen ? '▲' : '▼'}</span>
      </div>
      {isOpen && <div className="accordion-body p-2 bg-secondary text-light">{children}</div>}
    </div>
  )
}

export default AccordionItem
