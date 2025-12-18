import {useState} from 'react'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import resumePDF from '../../assets/CV_Tuymans_Nick.pdf'

export default function PdfModal() {
  const [modalOpen, setModalOpen] = useState(false)

  const toggle = () => setModalOpen(!modalOpen)

  return (
    <>
      <div className="d-flex justify-content-center my-3">
        <Button color="secondary" onClick={toggle} className="mb-3 ">
          Bekijk CV
        </Button>
      </div>

      <Modal isOpen={modalOpen} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle}>Mijn CV</ModalHeader>
        <ModalBody>
          <iframe src={resumePDF} width="100%" height="600px" style={{border: 'none'}} title="CV PDF" />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Sluiten
          </Button>
          <Button color="primary" href={resumePDF} download="MijnCV.pdf">
            Download
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}
