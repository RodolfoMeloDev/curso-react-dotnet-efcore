import TitlePage from '../../components/TitlePage';

import { InputGroup, Form, Button} from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { faPlus, faSort, faSortDown, faSortUp, faUserPen, faUserTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

const columns = [
  { label: "Id", accessor: "id", sortable: true },
  { label: "Nome", accessor: "nome", sortable: true },
  { label: "Responsável", accessor: "responsavel", sortable: true },
  { label: "Contato", accessor: "contato", sortable: true },
  { label: "Situação", accessor: "situacao", sortable: true },
  { label: "Opções", accessor: "opcoes", sortable: false },
 ];

 function getDefaultSorting(defaultTableData: any, columns: any) {
  const sorted = [...defaultTableData].sort((a, b) => {
    
    const filterColumn = columns.filter((column: any) => column.sortbyOrder);

    // Merge all array objects into single object and extract accessor and sortbyOrder keys
    let { accessor = "id", sortbyOrder = "asc" } = Object.assign(
      {},
      ...filterColumn
    );

    if (a[accessor] === null) return 1;
    if (b[accessor] === null) return -1;
    if (a[accessor] === null && b[accessor] === null) return 0;

    const ascending = a[accessor]
      .toString()
      .localeCompare(b[accessor].toString(), "en", {
        numeric: true,
      });

    return sortbyOrder === "asc" ? ascending : -ascending;
  });

  return sorted;
}

const ClienteLista: React.FC = () => {
  const navigate = useNavigate();

  const [termoBusca, setTermoBusca] = useState('');
  const [sortIcon, setSortIcon] = useState(faSort);  

  const clientesFiltrados = clientes.filter((cliente) => {
    return Object.values(cliente)
                 .join(' ')
                 .toLocaleLowerCase()
                 .includes(termoBusca.toLocaleLowerCase());
  })
  

  const [tableData, setTableData] = useState(getDefaultSorting(clientes, columns));

  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");  

  const handleSortingChange = (accessor: string) => {
    if(accessor !== '')
    {
      const sortOrder = accessor === sortField && order === "asc" ? "desc" : "asc";
      setSortField(accessor);
      setOrder(sortOrder);
      handleSorting(accessor, sortOrder);
      changeSortIcon();      
    }
  };

  const handleSorting = (sortField: string, sortOrder: string) => {
    if (sortField) {
      const sorted = [...tableData].sort((a, b) => {
        if (a[sortField] === null) return 1;
        if (b[sortField] === null) return -1;
        if (a[sortField] === null && b[sortField] === null) return 0;
        return (
          a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
            numeric: true,
          }) * (sortOrder === "asc" ? 1 : -1)
        );
      });
      setTableData(sorted);
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTermoBusca(e.target.value);
    setTableData(clientesFiltrados);
  }

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
            {columns.map((col) => {
                const cl = col.sortable ? 
                  sortField === col.accessor && order === "asc" ? 
                    faSortUp : 
                      sortField === col.accessor && order === "desc" ? faSortDown : faSort 
                  : null;

                return (
                <th
                  scope="col"
                  key={col.accessor}
                  onClick={col.sortable ? () => handleSortingChange(col.accessor) : () => handleSortingChange('')}
                >
                  {col.label}
                  {cl !== null ? <FontAwesomeIcon className='ms-3' icon={cl} /> : null}                  
                </th>
                );
              })}

            </tr>
          </thead>
          <tbody>
            {tableData.map((cliente) => (
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

export default ClienteLista;
