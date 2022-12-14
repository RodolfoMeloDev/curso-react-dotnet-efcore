import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import AtividadeForm from './AtividadeForm';
import AtividadesLista from './AtividadesLista';
import TitlePage from '../../components/TitlePage'
import api from '../../api/atividade';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { IAtividade, Prioridade } from '../../model/atividade';

const atividadeInicial: IAtividade = {
  id: 0,
  titulo: '',
  prioridade: Prioridade.NaoDefinido,
  descricao: ''
}

const Atividade = () => {
  const [smShowConfirmModal, setSmShowConfirmModal] = useState(false);
  const [showAtividadeModal, setShowAtividadeModal] = useState(false);

  const [atividades, setAtividades] = useState<IAtividade[]>([])
  const [atividade, setAtividade] = useState<IAtividade>(atividadeInicial);
  
  const handleAtividadeModal = () => {
    setShowAtividadeModal(!showAtividadeModal);
  }

  const handleConfirmModal = (id: number) => {
    if (id !== 0 && id !== undefined)
    {
      const atividade = atividades.filter( ativ => ativ.id === id);
      setAtividade(atividade[0]);
    }else{
      setAtividade(atividadeInicial)
    }

    setSmShowConfirmModal(!smShowConfirmModal);
  }
  
  const pegaTodasAtividades = async () => {
    const response = await api.get('atividade');
    return response.data;
  };

  const novaAtividade = () => {
    setAtividade(atividadeInicial);
    handleAtividadeModal();
  }

  useEffect(() => {
    const getAtividades = async () => {
      const todasAtividades = await pegaTodasAtividades();

      if (todasAtividades) setAtividades(todasAtividades);
    };
    getAtividades();
  }, [])

  const addAtividade = async (ativ: IAtividade) => {
    const response = await api.post('atividade', ativ);

    setAtividades([...atividades, response.data])
    handleAtividadeModal();
  }
  
  const cancelarAtividade = () => {
    setAtividade(atividadeInicial);
    handleAtividadeModal();
  }

  const atualizarAtividade = async (ativ: IAtividade) => {
    const response = await api.put(`atividade/${ativ.id}`, ativ);
    const { id } = response.data;

    setAtividades(atividades.map( item => item.id === id ? response.data : item ));

    setAtividade(atividadeInicial);
    handleAtividadeModal();
  }

  const deletarAtividade = async (id: number) => {
    handleConfirmModal(0);
    if (await api.delete(`atividade/${id}`))
    {
      const atividadesFiltradas = atividades.filter(ativ => ativ.id !== id);
      setAtividades([...atividadesFiltradas])
    }
  }

  const pegarAtividade = (id: number) => {
    const atividade = atividades.filter( ativ => ativ.id === id);
    setAtividade(atividade[0]);
    handleAtividadeModal();
  }

  return (
    <>      
      <TitlePage 
        title="Atividades"
      >
        <Button variant="outline-secondary" onClick={novaAtividade}>
          <FontAwesomeIcon icon={faPlus} />
        </Button>
      </TitlePage>

      <AtividadesLista 
        handleConfirmModal={handleConfirmModal}
        pegarAtividade={pegarAtividade}
        atividades={atividades}
      />      

      <Modal show={showAtividadeModal} onHide={handleAtividadeModal}>
        <Modal.Header closeButton>
          <Modal.Title>            
            Atividade{atividade.id !==0 ? ': ' + atividade.id : null}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AtividadeForm 
            addAtividade={addAtividade}
            cancelarAtividade={cancelarAtividade}
            atualizarAtividade={atualizarAtividade}
            atividadeSelecionada={atividade}
          />
        </Modal.Body>
      </Modal>

      <Modal 
        size='sm'
        show={smShowConfirmModal} 
        hide={handleConfirmModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>            
            Excluindo Atividade {atividade.id !==0 ? ': ' + atividade.id : null}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza que deseja exlcuir a Atividade {atividade.id}
        </Modal.Body>
        <Modal.Footer className='d-flex justify-content-between'>
          <button 
            className="btn btn-sm btn-outline-success"
            onClick={() => deletarAtividade(atividade.id)}
          >
            <FontAwesomeIcon className='me-2' icon={faCheck} />
            Sim
          </button>
          <button 
            className="btn btn-sm btn-danger"
            onClick={() => handleConfirmModal(0)}
          >
            <FontAwesomeIcon className='me-2' icon={faTimes} />
            N??o
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default Atividade;
