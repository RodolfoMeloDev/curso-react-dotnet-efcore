import { IAtividade } from "./atividade";

export interface AtividadeItemProps{
    atividade: IAtividade;
    pegarAtividade: (id: number) => void;
    handleConfirmModal: (id: number) => void;
  }

export interface AtividadesListaProps {
    atividades: IAtividade[];
    pegarAtividade: (id: number) => void;
    handleConfirmModal: (id: number) => void;
  }

export interface AtividadeFormProps{
    atividadeSelecionada: IAtividade;
    atualizarAtividade: (atividade: IAtividade) => void;
    addAtividade: (atividade: IAtividade) => void;
    cancelarAtividade: () => void;
  }
