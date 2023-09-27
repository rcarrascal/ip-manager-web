
import { StorageContext } from './storage/storageContext'
import LoadingOverlay from 'react-loading-overlay-ts';
import { useContext, useEffect } from 'react';
import { ReactNotifications } from 'react-notifications-component';
import { Route, Routes } from "react-router-dom";
import RequireAuth from './util/RequiereAuth'
import Login from './component/Login'
import Home from './component/Home.tsx'
import NotFound from './component/NotFound'
import { notification } from './util/util';
import { getData } from './api/apiService.ts';


function App() {
  const value = useContext(StorageContext);




  return (
    <LoadingOverlay
      active={value.storage.loading}
      spinner
      text='Cargando Pagina...'
    >
      <div className="App">
        <ReactNotifications />
        <Routes>
          <Route path="/" element={<RequireAuth token={value.token}><Home /></RequireAuth>} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

      </div>
    </LoadingOverlay>
  );
}

export default App;
