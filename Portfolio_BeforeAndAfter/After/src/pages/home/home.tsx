import {Container, Row, Col} from 'reactstrap'
import HomeImage from '../../assets/foto_homepage.jpg'
import Quotes from './quotes.tsx' // Quotes-component dat 1 quote tegelijk toont

export default function Home() {
  return (
    <Container className="mt-5 text-light">
      <Row className="align-items-center">
        {/* Linker kolom: tekst + quote */}
        <Col lg="6" className="pe-lg-5">
          <h3>Hallo, ik ben</h3>
          <h1 className="mb-4">Nick Tuymans</h1>

          <p className="mb-4">
            Na tien jaar ervaring als monteur bij een busbedrijf heb ik de kans gekregen om mijn passie te volgen en
            creatief aan de slag te gaan in de IT-sector.
          </p>
          <p className="mb-4">
            Ik volg momenteel een opleiding tot programmeur/web developer, waarin ik werk met{' '}
            <strong>HTML5, CSS3, JavaScript, TypeScript, React, C#, Unity en SQL</strong>. In mijn vrije tijd ben ik
            bezig met het leren van Blender, een vervolg op mijn eerdere ervaring met Cinema 4D.
          </p>
          <p className="mb-4">
            Wanneer ik niet aan mijn studies werk, ontspan doormiddel van te gamen, waaruit ik veel inspiratie haal om
            zelf kleine programma's te schrijven die erop inspelen.
          </p>
          <p className="mb-4">
            Dit alles gebeurt meestal onder het oplettende oog van mijn twee Maine Coons, die af en toe voor de nodige
            afleiding zorgen.
          </p>

          {/* Quotes-component */}
          <div className="mt-5">
            <Quotes />
          </div>
        </Col>

        {/* Rechter kolom: afbeelding */}
        <Col lg="6" className="text-center">
          <img
            src={HomeImage}
            className="img-fluid rounded-circle shadow-lg"
            alt="Nick Tuymans"
            style={{maxWidth: '350px'}}
          />
        </Col>
      </Row>
    </Container>
  )
}
