import {Container, Row, Col, Card, CardBody, Form, FormGroup, Label, Input, Button} from 'reactstrap'

const ContactSection = () => {
  return (
    <section id="contact">
      <Container>
        <h2 className="text-center text-white">
          <strong>Contact</strong>
        </h2>

        <div className="d-flex align-items-center mt-0 pt-0">
          <img src="img/e-mail.png" alt="foto van een email" className="mx-auto" />
        </div>

        <Row>
          <Col lg="7" className="mx-auto">
            <Card className="mt-2 mx-auto p-4 bg-light">
              <CardBody className="bg-light">
                <Form method="post" action="https://tm-statweb.be/sendmail.php">
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <Label for="name">Voornaam*</Label>
                        <Input id="name" name="name" type="text" placeholder="Voornaam" required />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label for="achternaam">Achternaam*</Label>
                        <Input id="achternaam" name="achternaam" type="text" placeholder="Achternaam" required />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <Label for="email">E-mail*</Label>
                        <Input id="email" name="email" type="email" placeholder="E-mail" required />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label for="onderwerp">Onderwerp*</Label>
                        <Input id="onderwerp" name="onderwerp" type="text" placeholder="Onderwerp" required />
                      </FormGroup>
                    </Col>
                  </Row>

                  <FormGroup className="mt-2">
                    <Label for="bericht">Bericht*</Label>
                    <Input
                      id="bericht"
                      name="bericht"
                      type="textarea"
                      placeholder="Schrijf hier je bericht."
                      rows={10}
                      required
                    />
                  </FormGroup>

                  <Input type="hidden" name="studentemail" value="r0333915@student.thomasmore.be" />

                  <Button type="submit" color="dark" className="mt-3 mb-5">
                    Verstuur
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default ContactSection
