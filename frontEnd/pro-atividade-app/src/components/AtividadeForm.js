import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import { useEffect, useState } from 'react'

const atividadeInicial = {
  id: 0,
  titulo: '',
  prioridade: 0,
  descricao: ''
}

export default function AtividadeForm(props) {
  const [atividade, setAtividade] = useState(atividadeAtual())

  useEffect(() => {
    if (props.atividadeSelecionada.id !== 0){
      setAtividade(props.atividadeSelecionada)
    }
  }, [props.atividadeSelecionada])

  const inputTextHandler = (e) => {
    const {name, value} = e.target;

    setAtividade({...atividade, [name]: value})
  }

  function atividadeAtual() {
    if (props.atividadeSelecionada.id !== 0){
      return props.atividadeSelecionada
    }
    else{
      return atividadeInicial
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (props.atividadeSelecionada.id !== 0){
      props.atualizarAtividade(atividade)
    }else
      props.addAtividade(atividade);

    setAtividade(atividadeInicial);
  }

  const handlerCancelar = (e) => {
    e.preventDefault();

    props.cancelarAtividade()

    setAtividade(atividadeInicial); 
  }

  return (
    <>
      <h1>Atidades{atividade.id !==0 ? ': ' + atividade.id : null}</h1>
      <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label htmlFor="titulo"className="form-lable">Título</label>
            <input 
              id="titulo"
              name="titulo"
              type="text" 
              className="form-control" 
              placeholder="Título"
              onChange={inputTextHandler}
              value={atividade.titulo}
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="prioridade"className="form-lable">Prioridade</label>
            <select 
              id="prioridade" 
              name="prioridade"
              className="form-select"
              onChange={inputTextHandler}
              value={atividade.prioridade}
            >
              <option defaultValue="0">Selecionar...</option>
              <option value="1">Baixa</option>
              <option value="2">Normal</option>
              <option value="3">Alta</option>
            </select>
          </div>


          <div className="col-md-12">
            <label htmlFor="descricao"className="form-lable">Descrição</label>
            <textarea 
              id="descricao" 
              name="descricao"
              type="text" 
              className="form-control" 
              placeholder="Descrição"
              onChange={inputTextHandler}
              value={atividade.descricao}
            />
          <hr />
          </div>
          <div className="col-12 mt-0">
            {
              atividade.id === 0 ?
              <button 
                className="btn btn-secondary" 
                type='submit'
              >
                <FontAwesomeIcon  className='me-2' icon={faPlus} />
                Atividade
              </button>
              :
              <>
                <button   className="btn btn-secondary me-2" type="submit">
                  <FontAwesomeIcon  className='me-2' icon={faPlus} />
                  Salvar
                </button>
                <button 
                  className="btn btn-warning" 
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
