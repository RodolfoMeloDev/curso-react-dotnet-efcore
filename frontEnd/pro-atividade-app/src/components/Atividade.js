import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons'
import { faSmile, faFaceMeh, faFrown } from '@fortawesome/free-regular-svg-icons'
import React from 'react'

export default function Atividade(props) {

  function prioridadeLabel(param){
    switch(param){
      case 'Baixa':
      case 'Normal':
      case 'Alta':
        return param;
      default:
          return 'Não Definido';
    }
  }

  function prioridadeIcon(param){
    switch(param){
      case 'Baixa':
        return faSmile;
      case 'Normal':
        return faFaceMeh;
      case 'Alta':
        return faFrown;
      default:
          return '';
    }
  }

  function prioridadeColor(param){
    switch(param){
      case 'Baixa':
        return 'success';
      case 'Normal':
        return 'dark';
      case 'Alta':
        return 'warning';
      default:
          return '';
    }
  }

  return (
    <div className={"card mb-2 shadow-sm border-"+prioridadeColor(props.atividade.prioridade)}>
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <h5 className="card-title">
            <span className="badge bg-secondary me-1">{props.atividade.id}</span>
            - {props.atividade.titulo}
          </h5>
          <h6>
            Prioridade:
            <span className={"ms-1 text-"+prioridadeColor(props.atividade.prioridade)}>
              {props.atividade.prioridade === 0 || props.atividade.prioridade === "NaoDefinido" ? "" : <FontAwesomeIcon className="me-1" icon={prioridadeIcon(props.atividade.prioridade)} />}
              {prioridadeLabel(props.atividade.prioridade)}
            </span>
          </h6>
        </div>
        <p className="card-text">
          {props.atividade.descricao}
        </p>
        <div className="d-flex justify-content-end pt-2 m-0 border-top">
          <button className="btn btn-sm btn-primary me-2"
            onClick={() => props.pegarAtividade(props.atividade.id)}
          >
            <FontAwesomeIcon className="me-2" icon={faPen} 
          />
            Editar
          </button>
          <button className="btn btn-sm btn-danger" 
            onClick={() => props.handleConfirmModal(props.atividade.id)}
          >
            <FontAwesomeIcon className="me-2" icon={faTrash} 
          />
            Deletar
          </button>
        </div>
      </div>
    </div>
  )
}
