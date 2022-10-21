import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import React, { useEffect, useState } from 'react'
import { IAtividade, Prioridade } from '../../model/atividade';
import { AtividadeFormProps } from '../../model/atividadesProps';

const atividadeInicial: IAtividade = {
  id: 0,
  titulo: '',
  prioridade: Prioridade.NaoDefinido,
  descricao: ''
}

const AtividadeForm: React.FC<AtividadeFormProps> = ({
    atividadeSelecionada,
    atualizarAtividade,
    addAtividade,
    cancelarAtividade
  }: AtividadeFormProps
  ) => {
  const [atividade, setAtividade] = useState<IAtividade>(atividadeAtual())

  function atividadeAtual(): IAtividade {
    if (atividadeSelecionada.id !== 0){
      return atividadeSelecionada
    }
    else{
      return atividadeInicial
    }
  }  

  useEffect(() => {
    if (atividadeSelecionada.id !== 0){
      setAtividade(atividadeSelecionada)
    }
  }, [atividadeSelecionada])

  const handleValue = (e: any) => {
    const {name, value} = e.target;

    setAtividade({...atividade, [name]: value})
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (atividadeSelecionada.id !== 0){
      atualizarAtividade(atividade)
    }else
      addAtividade(atividade);

    setAtividade(atividadeInicial);
  }

  const handlerCancelar = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    cancelarAtividade()

    setAtividade(atividadeInicial); 
  }

  return (
    <>      
      <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label htmlFor="titulo"className="form-lable">Título</label>
            <input 
              id="titulo"
              name="titulo"
              type="text" 
              className="form-control" 
              placeholder="Título"
              onChange={handleValue}
              value={atividade.titulo}
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="prioridade"className="form-lable">Prioridade</label>
            <select 
              id="prioridade" 
              name="prioridade"
              className="form-select"
              onChange={handleValue}
              value={atividade.prioridade}
            >
              <option value="NaoDefinido">Selecionar...</option>
              <option value="Baixa">Baixa</option>
              <option value="Normal">Normal</option>
              <option value="Alta">Alta</option>
            </select>
          </div>


          <div className="col-md-12">
            <label htmlFor="descricao"className="form-lable">Descrição</label>
            <textarea 
              id="descricao" 
              name="descricao"
              className="form-control" 
              placeholder="Descrição"
              onChange={handleValue}
              value={atividade.descricao}
            />
          <hr />
          </div>
          <div className="col-12 mt-0">
            {
              atividade.id === 0 ?
              <button 
                className="btn btn-success" 
                type='submit'
              >
                <FontAwesomeIcon  className='me-2' icon={faPlus} />
                Salvar
              </button>
              :
              <>
                <button   className="btn btn-sm btn-secondary me-2" type="submit">
                  <FontAwesomeIcon  className='me-2' icon={faPlus} />
                  Salvar
                </button>
                <button 
                  className="btn btn-sm btn-warning" 
                  onClick={handlerCancelar}
                >
                  <FontAwesomeIcon  className='me-2' icon={faPlus} />
                  Cancelar
                </button>
              </>
            }          
          </div>
      </form>
    </>
  )
}

export default AtividadeForm;
