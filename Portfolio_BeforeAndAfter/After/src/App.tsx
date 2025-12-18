import {Container} from 'reactstrap'
import {Routes, Route} from 'react-router-dom'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import NavbarMenu from './components/navbar/navbar.tsx'
import Home from './pages/home/home.tsx'
import Skills from './pages/skills/skillsPage.tsx'
import Contact from './pages/contact/contact.tsx'

import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import Projects from './pages/projects/projects.tsx'

// Maak één gedeelde QueryClient aan
const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-black min-vh-100 text-light">
        {/* Navigatiebalk bovenaan */}
        <NavbarMenu />

        {/* De content van de pagina's */}
        <main className="py-5">
          <Container fluid className="px-5">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/projects" element={<Projects />} />
            </Routes>
          </Container>
        </main>
      </div>
    </QueryClientProvider>
  )
}

export default App
