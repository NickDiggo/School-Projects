import type {FunctionComponent, PropsWithChildren} from 'react'
import {createContext, useState} from 'react'

interface IAccordionContext {
  currentOpenKey: string | undefined
  toggleOpenKey: (key: string) => void
}

export const AccordionContext = createContext<IAccordionContext>({
  currentOpenKey: undefined,
  toggleOpenKey: () => {},
})

const Accordion: FunctionComponent<PropsWithChildren> = ({children}) => {
  const [currentOpenKey, setCurrentOpenKey] = useState<string | undefined>(undefined)

  const toggleOpenKey = (key: string) => {
    setCurrentOpenKey(currentOpenKey === key ? undefined : key)
  }

  return (
    <AccordionContext.Provider value={{currentOpenKey, toggleOpenKey}}>
      <div className="accordion">{children}</div>
    </AccordionContext.Provider>
  )
}

export default Accordion
