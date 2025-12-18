import {useSuspenseQuery, type UseSuspenseQueryResult} from '@tanstack/react-query'
import type {IQuote} from '../models/IQuotes.ts'

// ------------- API-functie -------------
const getQuotes = async (): Promise<IQuote[]> => {
  // Simuleer een kleine vertraging om Suspense te tonen
  await new Promise(resolve => setTimeout(resolve, 500))

  const response = await fetch('/src/data/quotes.json')
  if (!response.ok) {
    throw new Error('Kon quotes niet ophalen')
  }
  return response.json()
}

// ------------- Query wrapper -------------
export const useGetQuotes = (): UseSuspenseQueryResult<IQuote[], Error> => {
  return useSuspenseQuery({
    queryKey: ['quotes'],
    queryFn: getQuotes,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 10,
  })
}
