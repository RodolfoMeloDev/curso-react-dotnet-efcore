import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faSmile, faFaceMeh, faFrown } from '@fortawesome/free-regular-svg-icons'
import { AtividadeItemProps } from '../../model/atividadesProps';
import { Prioridade } from '../../model/atividade';

const AtividadeItem:React.FC<AtividadeItemProps> = ({
    atividade,
    pegarAtividade,
    handleConfirmModal
  }: AtividadeItemProps 
  ) => {

  function prioridadeLabel(param: string){
    switch(param){
      case Prioridade.Baixa:
      case Prioridade.Normal:
      case Prioridade.Alta:
        return param;
      default:
          return 'Não definido';
    }
  }

  const prioridadeIcon = (param: string): IconDefinition => {
    switch(param){
      case Prioridade.Baixa:
        return faSmile;
      case Prioridade.Normal:
        return faFaceMeh;
      case Prioridade.Alta:
        return faFrown;
      default:
          return faFaceMeh;
    }
  }

  function prioridadeColor(param: string){
    switch(param){
      case Prioridade.Baixa:
        return 'success';
      case Prioridade.Normal:
        return 'dark';
      case Prioridade.Alta:
        return 'warning';
      default:
          return '';
    }
  }

  return (
    <div className={"card mb-2 shadow-sm border-"+prioridadeColor(atividade.prioridade)}>
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <h5 className="card-title">
            <span className="badge bg-secondary me-1">{atividade.id}</span>
            - {atividade.titulo}
          </h5>
          <h6>
            Prioridade:
            <span className={"ms-1 text-"+prioridadeColor(atividade.prioridade)}>
              {atividade.prioridade === "NaoDefinido" ? "" : <FontAwesomeIcon className="me-1" icon={prioridadeIcon(atividade.prioridade)} />}
              {prioridadeLabel(atividade.prioridade)}
            </span>
          </h6>
        </div>
        <p className="card-text">
          {atividade.descricao}
        </p>
        <div className="d-flex justify-content-end pt-2 m-0 border-top">
          <button className="btn btn-sm btn-primary me-2"
            onClick={() => pegarAtividade(atividade.id)}
          >
            <FontAwesomeIcon className="me-2" icon={faPen} />
            Editar
          </button>
          <button className="btn btn-sm btn-danger" 
            onClick={() => handleConfirmModal(atividade.id)}
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

export default AtividadeItem;
