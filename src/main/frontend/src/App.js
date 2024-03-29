
import { StorageContext } from './storage/storageContext'
import LoadingOverlay from 'react-loading-overlay-ts';
import { useContext } from 'react';
import { ReactNotifications } from 'react-notifications-component';
import { Route, Routes } from "react-router-dom";
import RequireAuth from './util/RequiereAuth'
import Login from './component/Login'
import Home from './component/Home.tsx'
import NotFound from './component/NotFound'


function App() {
  const value = useContext(StorageContext);

  return (
    <LoadingOverlay
      active={value.storage.loading}
      spinner
      text='Cargando Página...'
      className={`overlay-fullscreen ${value.page}`}
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
