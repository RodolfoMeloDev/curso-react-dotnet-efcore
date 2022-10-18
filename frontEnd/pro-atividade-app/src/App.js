import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import './App.css';
import AtividadeForm from './components/AtividadeForm';
import AtividadesLista from './components/AtividadesLista';
import api from './api/atividade';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

function App() {
  const [smShowConfirmModal, setSmShowConfirmModal] = useState(false);
  const [showAtividadeModal, setShowAtividadeModal] = useState(false);
  const [atividades, setAtividades] = useState([])
  const [atividade, setAtividade] = useState({id:0});
  
  const handleAtividadeModal = () => {
    setShowAtividadeModal(!showAtividadeModal);
  }

  const handleConfirmModal = (id) => {
    if (id !== 0 && id !== undefined)
    {
      const atividade = atividades.filter( ativ => ativ.id === id);
      setAtividade(atividade[0]);
    }else{
      setAtividade({id : 0})
    }

    setSmShowConfirmModal(!smShowConfirmModal);
  }
  
  const pegaTodasAtividades = async () => {
    const response = await api.get('atividade');
    return response.data;
  };

  const novaAtividade = () => {
    setAtividade({ id : 0 });
    handleAtividadeModal();
  }

  useEffect(() => {
    const getAtividades = async () => {
      const todasAtividades = await pegaTodasAtividades();

      if (todasAtividades) setAtividades(todasAtividades);
    };
    getAtividades();
  }, [])

  const addAtividade = async (ativ) => {
    const response = await api.post('atividade', ativ);

    setAtividades([...atividades, response.data])
    handleAtividadeModal();
  }
  
  const cancelarAtividade = () => {
    setAtividade({id: 0});
    handleAtividadeModal();
  }

  const atualizarAtividade = async (ativ) => {
    const response = await api.put(`atividade/${ativ.id}`, ativ);
    const { id } = response.data;

    setAtividades(atividades.map( item => item.id === id ? response.data : item ));

    setAtividade({id: 0});
    handleAtividadeModal();
  }

  const deletarAtividade = async (id) => {
    handleConfirmModal(0);
    if (await api.delete(`atividade/${id}`))
    {
      const atividadesFiltradas = atividades.filter(ativ => ativ.id !== id);
      setAtividades([...atividadesFiltradas])
    }
  }

  const pegarAtividade = (id) => {
    const atividade = atividades.filter( ativ => ativ.id === id);
    setAtividade(atividade[0]);
    handleAtividadeModal();
  }

  return (
    <>      
      <div className="d-flex justify-content-between align-items-end mt-2 pb-3 border-bottom border-1">
        <h1 className='m-0 p-0'>Atividades</h1>
        <Button variant="outline-secondary" onClick={novaAtividade}>
          <FontAwesomeIcon icon={faPlus} />
        </Button>
      </div>

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
            atividades={atividades}
          />
        </Modal.Body>
      </Modal>

      <Modal 
        size='sm'
        show={smShowConfirmModal} 
        onHide={handleConfirmModal}
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
            Não
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default App;
