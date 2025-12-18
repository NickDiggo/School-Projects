import {useEffect, useState} from 'react'
import {useSuspenseQuery} from '@tanstack/react-query'
import QuoteItem from './quoteItem.tsx'
import type {IQuote} from '../../models/IQuotes.ts'

// Query-functie (leest je lokale JSON in)
const getQuotes = async (): Promise<IQuote[]> => {
  const response = await fetch('/src/data/quotes.json')
  if (!response.ok) throw new Error('Fout bij het laden van quotes')
  return response.json()
}

export default function Quotes() {
  const {data: quotes} = useSuspenseQuery({
    queryKey: ['quotes'],
    queryFn: getQuotes,
  })

  const [index, setIndex] = useState(0)

  // Verander quote elke 10 seconden
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % quotes.length)
    }, 10000)
    return () => clearInterval(interval)
  }, [quotes.length])

  return (
    <div className="mt-3">
      <QuoteItem {...quotes[index]} />
    </div>
  )
}
