import { useEffect, useState } from 'react';
import './App.css';
import AtividadeForm from './components/AtividadeForm';
import AtividadesLista from './components/AtividadesLista';

let initialState = [
  {
    id: 1,
    prioridade: '1',
    titulo: 'Título 1',
    descricao: 'Primeira Atividade'
  },
  {
    id: 2,
    prioridade: '1',
    titulo: 'Título 2',
    descricao: 'Segunda Atividade'
  }
];

function App() {
  const [index, setIndex] = useState(0);
  const [atividades, setAtividades] = useState(initialState)
  const [atividade, setAtividade] = useState({id:0});

  useEffect(() => {
    atividades.length <= 0 ? 
      setIndex(1) : 
      setIndex(
        Math.max.apply(
          Math, 
          atividades.map(item => item.id)
      ) + 1)
  }, [atividades])

  function addAtividade(ativ){
    if (document.getElementById('prioridade').value === 'Selecionar...')
    {
      alert("Selecione a prioridade da atividade!")
      return
    }

    // novo padrão
    setAtividades([...atividades, {...ativ, id: index}])
  }

  function deletarAtividade(id){
    const atividadesFiltradas = atividades.filter(ativ => ativ.id !== id);
    setAtividades([...atividadesFiltradas])
    console.log(atividades)
  }

  function cancelarAtividade(){
    setAtividade({id: 0});
  }

  function atualizarAtividade(ativ) {
    setAtividades(atividades.map( item => item.id === ativ.id ? ativ : item ))

    setAtividade({id: 0})
  }

  function pegarAtividade(id){
    const atividade = atividades.filter( ativ => ativ.id === id);
    setAtividade(atividade[0]);
  }

  return (
    <>
      <AtividadeForm 
        addAtividade={addAtividade}
        cancelarAtividade={cancelarAtividade}
        atualizarAtividade={atualizarAtividade}
        atividadeSelecionada={atividade}
        atividades={atividades}
      />
      <AtividadesLista 
        deletarAtividade={deletarAtividade}
        pegarAtividade={pegarAtividade}
        atividades={atividades}
      />
    </>
  );
}

export default App;
