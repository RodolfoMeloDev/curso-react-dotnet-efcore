import TitlePage from '../../components/TitlePage'
import { Button } from 'react-bootstrap'
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeftLong } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';

const ClienteForm: React.FC = () => {
  const navigate = useNavigate();
  let { id } = useParams();

  return (
    <>
        <TitlePage title={(id === undefined ? 'Novo Cliente ' : 'Cliente: ' + id)}>
            <Button 
              variant='outline-secondary' 
              onClick={() => navigate('/cliente/lista')}
            >
              <FontAwesomeIcon className='me-2' icon={faLeftLong} />
              Voltar
            </Button>
        </TitlePage>
    </>
  )
}

export default ClienteForm;
