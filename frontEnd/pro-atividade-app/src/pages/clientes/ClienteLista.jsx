import TitlePage from '../../components/TitlePage';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTimes, faUserPen } from '@fortawesome/free-solid-svg-icons'
import { InputGroup, Form, Button} from 'react-bootstrap'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { faPlus, faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

const clientes = [
  {
    id: 1,
    nome: 'Microsoft',
    responsavel: 'Otto',
    contato: '10665544',
    situacao: 'Ativo'
  },
  {
    id: 2,
    nome: 'Amazon',
    responsavel: 'Willian',
    contato: '55448899',
    situacao: 'Desativado'
  },
  {
    id: 3,
    nome: 'Google',
    responsavel: 'Luke',
    contato: '66554433',
    situacao: 'Em Ýnalise'
  },
  {
    id: 4,
    nome: 'Facebook',
    responsavel: 'Kevin',
    contato: '75881515',
    situacao: 'Ativo'
  },
  {
    id: 5,
    nome: 'Twitter',
    responsavel: 'Jack',
    contato: '00256548',
    situacao: 'Ativo'
  }
]

export default function ClienteLista() {
  const navigate = useNavigate();

  const [termoBusca, setTermoBusca] = useState('');

  const [sortIcon, setSortIcon] = useState(faSort);
  
  const handleInputChange = (e) => {
    setTermoBusca(e.target.value);
  }

  const clientesFiltrados = clientes.filter((cliente) => {
    return Object.values(cliente)
                 .join(' ')
                 .toLocaleLowerCase()
                 .includes(termoBusca.toLocaleLowerCase());
                 
  });

  const changeSortIcon = () => {
    switch(sortIcon){
      case faSort:
        setSortIcon(faSortUp);
        return sortIcon;
      case faSortUp:
        setSortIcon(faSortDown);
        return sortIcon;
      case faSortDown:
        setSortIcon(faSort);
        return sortIcon;
      default:
        setSortIcon(faSort);
        return sortIcon;
    }
  }

  const novoCliente = () => {
    navigate('/cliente/detalhe');
  }

  return (
    <>
        <TitlePage title='Clientes' >
          <Button variant='outline-secondary' onClick={novoCliente}>
            <FontAwesomeIcon className='me-2' icon={faPlus} />
            Novo Cliente
          </Button>
        </TitlePage>
        <InputGroup className="mb-3 mt-3">
          <InputGroup.Text id="inputGroup-sizing-default">Buscar:</InputGroup.Text>
          <Form.Control
            onChange={handleInputChange}
            placeholder='Buscar por nome do cliente'
          />
        </InputGroup>
        <table className="table table-striped table-hover">
          <thead className='table-dark mt-3'>
            <tr>
              <th scope="col" id="ID" onClick={changeSortIcon}>
                #
                <FontAwesomeIcon className='ms-3' icon={sortIcon} />
              </th>
              <th scope="col">Nome</th>
              <th scope="col">Responsável</th>
              <th scope="col">Contato</th>
              <th scope="col">Situação</th>
              <th scope="col">Opções</th>
            </tr>
          </thead>
          <tbody>
            {clientesFiltrados.map((cliente) => (
              <tr key={cliente.id}>
                <td>{cliente.id}</td>
                <td>{cliente.nome}</td>
                <td>{cliente.responsavel}</td>
                <td>{cliente.contato}</td>
                <td>{cliente.situacao}</td>
                <td>
                  <div>
                    <button 
                      className="btn btn-sm btn-outline-primary me-2" 
                      onClick={() => navigate(`/cliente/detalhe/${cliente.id}`) }
                    >
                      <FontAwesomeIcon className="me-2" icon={faUserPen} />
                      Editar
                    </button>
                    <button className="btn btn-sm btn-outline-danger me-2">
                    <FontAwesomeIcon className="me-2" icon={faUserTimes} />
                      Desativar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    </>
  )
}
