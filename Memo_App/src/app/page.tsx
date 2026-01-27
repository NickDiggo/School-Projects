// app/page.tsx alleen => logiva is verplaatst pagina per pagina
import {redirect} from 'next/navigation'

export default function HomePage() {
  redirect('/login')
}
