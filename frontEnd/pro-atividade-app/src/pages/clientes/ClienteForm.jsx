import TitlePage from '../../components/TitlePage'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faLeftLong } from '@fortawesome/free-solid-svg-icons';
import { useHistory, useParams } from 'react-router-dom';

export default function ClienteForm() {
  const history = useHistory();
  let { id } = useParams();

  return (
    <>
        <TitlePage title={(id === undefined ? 'Novo Cliente ' : 'Cliente: ' + id)}>
            <Button 
              variant='outline-secondary' 
              onClick={() => history.goBack()}
            >
              <FontAwesomeIcon className='me-2' icon={faLeftLong} />
              Voltar
            </Button>
        </TitlePage>
    </>
  )
}
