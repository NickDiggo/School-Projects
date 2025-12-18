import type {FunctionComponent} from 'react'
import type {IQuote} from '../../models/IQuotes.ts'
import {Card, CardBody, CardTitle, CardText} from 'reactstrap'

const QuoteItem: FunctionComponent<IQuote> = ({author, text}) => {
  return (
    <Card className="bg-dark text-light border-0 shadow-sm">
      <CardBody>
        <CardTitle tag="h5" className="fst-italic">
          “{text}”
        </CardTitle>
        <CardText className="text-end text-secondary">— {author}</CardText>
      </CardBody>
    </Card>
  )
}

export default QuoteItem
