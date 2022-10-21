import AtividadeItem from './AtividadeItem'
import { AtividadesListaProps } from '../../model/atividadesProps'

const AtividadesLista: React.FC<AtividadesListaProps> = ({
    atividades,
    handleConfirmModal,
    pegarAtividade
  }: AtividadesListaProps
  ) => {
  return (
    <div className="mt-3">        
      {atividades.map(ativ => (
        <AtividadeItem key={ativ.id} 
          handleConfirmModal={handleConfirmModal}
          pegarAtividade={pegarAtividade}
          atividade={ativ}
        />
      ))}        
    </div>
  )
}

export default AtividadesLista;
