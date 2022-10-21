export enum Prioridade{
  NaoDefinido = 'NaoDefinido',
  Baixa = 'Baixa',
  Normal = 'Normal',
  Alta = 'Alta'
}

export interface IAtividade {
    prioridade: Prioridade;
    id: number;
    titulo: string;
    descricao: string;
  }
