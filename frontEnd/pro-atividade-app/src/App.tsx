import './App.css';
import Atividade from './pages/atividades/Atividade';
import Cliente from './pages/clientes/Cliente';

import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import ClienteForm from './pages/clientes/ClienteForm';
import PageNotFound from './pages/PageNotFound';
import React from 'react';

const App: React.FC =() => { 
  return(
    <>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/atividade/*' element={<Atividade />} />
        <Route path='/cliente/*' element={<Cliente />} />
        <Route path='/cliente/:id/atividade' element={<Atividade />} />
        <Route path='/cliente/detalhe/' element={<ClienteForm />} />
        <Route path='/cliente/detalhe/:id' element={<ClienteForm />} />
        <Route element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
