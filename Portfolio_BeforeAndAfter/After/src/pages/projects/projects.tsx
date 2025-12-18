import {useQuery} from '@tanstack/react-query'
import {Container, Row, Col, Card, CardBody, CardTitle, CardText, Button, Spinner} from 'reactstrap'
import {useState} from 'react'
import {fetchRepos} from '../../api/githubApi.ts'

const ProjectsPage = () => {
  const {
    data: repos,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['repos'],
    queryFn: fetchRepos, // geen argument meer
  })

  const [visibleCount, setVisibleCount] = useState(6)

  if (isLoading)
    return (
      <div className="text-center text-light mt-5">
        <Spinner color="light" /> <p>Laden...</p>
      </div>
    )

  if (isError)
    return (
      <div className="text-center text-danger mt-5">
        <p>Er ging iets mis bij het laden van je projecten.</p>
        <Button color="secondary" onClick={() => refetch()}>
          Opnieuw proberen
        </Button>
      </div>
    )

  return (
    <Container className="py-5 text-light">
      <h1 className="mb-4 text-center">Git Projecten</h1>
      <Row className="g-4">
        {repos.slice(0, visibleCount).map((repo: any) => (
          <Col md="6" lg="4" key={repo.id}>
            <Card className="bg-dark text-light h-100 border-secondary shadow-sm">
              <CardBody>
                <CardTitle tag="h5">{repo.name}</CardTitle>
                <CardText className="text-light">
                  {repo.description ? repo.description : 'Geen beschrijving beschikbaar.'}
                </CardText>
                <p className="small mb-2">
                  created: {repo.created_at.slice(0, 10)} | Language: {repo.language || 'Onbekend'}
                </p>
                <Button color="light" size="sm" href={repo.html_url} target="_blank" rel="noopener noreferrer">
                  Bekijk op GitHub
                </Button>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>

      {visibleCount < repos.length && (
        <div className="text-center mt-4">
          <Button color="secondary" onClick={() => setVisibleCount(visibleCount + 6)}>
            Meer laden
          </Button>
        </div>
      )}
    </Container>
  )
}

export default ProjectsPage
