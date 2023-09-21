import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React, { useState, useEffect, useCallback, useContext, Fragment } from 'react';
import { Button } from '@mui/material';
import './home.css'
import { ipMaster } from '../dto/ipMaster';
import { StorageContext } from '../storage/storageContext';
import { getIp, postData, deleteData ,logout} from '../api/apiService.ts'
import { notification, ipValid } from '../util/util'

import { useNavigate } from 'react-router-dom';

function Home() {
  const value = useContext(StorageContext);
  const [ip, setIp] = useState("");
  const [rows, setRows] = useState<ipMaster[]>([]);
  const navigate = useNavigate();

  /**
   * Definición de componente button que va en la tabla
   * @param params 
   * @returns 
   */
  const renderDetailsButton = (params) => {
    if(params.row.state.trim() =="ACEPTADO"){
      return <Fragment></Fragment>
    }
    return (
      <strong>
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{minWidth:"25px"}}
          onClick={() => {
            eventDelete(params.row.id)
          }}
        >
          <i className="bi bi-trash3-fill" />
        </Button>
      </strong>
    )
  }

  /**
   * Definición de la tabla de Ip
   */
  const columns: GridColDef[] = [
    { field: 'ipAddress', headerName: 'Dirección IP', width: 150 },
    { field: 'state', headerName: 'Estado', width: 160 },
    { field: 'message', headerName: 'Motivo rechazo', width: 240 },
    {
      field: 'col5',
      headerName: 'Eliminar',
      width: 70,
      renderCell: renderDetailsButton
    },
  ];


  const validate401 = (response) => {
   
      if (response.status === '401') {
        value.setLoading(false);
        localStorage.clear();
        value.handleToken(null);
        value.setClearUser();
        notification("danger", "Listando Ip ","Su token no es valido. Favor de logearse nuevamente");
        navigate("/login");
        return true;
      }
      return false;
    
  }

  const fetchData = useCallback(async () => {
    value.setLoading(true);

    getIp('/ip_master', value.token)
      .then(response => {

        if(validate401(response)){
          return;
        }

        if (response.message) {
          throw new Error(response.message);
        }

        setRows(response.response);
        value.setLoading(false);
      }).catch(error => {
        if(!validate401(error)){
        const err = error.message ? error.message : error;
        notification("danger", "Listando Ip ", err);
        value.setLoading(false);
      }
      });

  }, [])

  /**
   * Metodo que se ejecuta cada vez que se actualiza el estado.
   */
  useEffect(() => {
    fetchData();
  }, [fetchData]);


  const addIp = () => {

    if (ip === "") {
      notification("warning", "Validación de campos ", "Ip no puede estar vacia");
      return;
    }

    if (!ipValid(ip)) {
      console.log(`ip: [${ip}] invalida`);
      notification("warning", "Validación de campos ", "Debe escribir una ip Valida");
      return;
    }
    const data: ipMaster = {
      ipAddress: ip,
      name: ""
    }
    value.setLoading(true);
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + value.token
    };
    postData('/ip_master', data, headers)
      .then(response => {
        console.log(response.response);
        if (response.error) {
          throw new Error(response.error);
        }
        value.setLoading(false);
        fetchData();
        setIp("");
      })

      .catch(error => {
        console.log("error", error);
        const err = error.message ? error.message : error;
        console.log("err", err);
        notification("danger", "Guardando Ip ", err);
        value.setLoading(false);
      });

  };

const logoutdData=()=>{
  const username = value.storage.user.username;;
logout("/auth/logout/"+username)
.then(response =>{

  localStorage.clear();
  navigate("/login");
})
}



  /**
   * Medoto para eliminar una ip 
   * @param val 
   */
  const eventDelete = (val) => {
    deleteData('/ip_master/' + val,  value.token)
      .then(e => {
        validate401(e);
        fetchData();
      })
      .catch(error => {
        notification("danger", "Eliminando Ip ", error);
        value.setLoading(false);
      });
  }

  return <div className='principal'><div style={{ height: 400, minWidth: '650px' }}>
    <img alt="Grupo Puerto Cartagena" className="login-img" src={process.env.PUBLIC_URL + '/img/logo-grupo.svg'} ></img>
    <div style={{   display:"flex", justifyContent:"space-between", padding: "2rem 0 1rem" }}>
    <h4>Registro de IP</h4> 
    <button onClick={e=>logoutdData()} type="button" className="btn btn-primary btn-sm btn-block">
      <i title='LOGOUT' class="bi bi-box-arrow-left"></i>
        <span> Cerrar sesión</span>
    </button>
    </div>
    <div className="input-group input-group-lg mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text" style={{ height: "100%" }}>
          <i className="bi bi-globe"></i>
        </span>
      </div>
      <input type="text" onChange={e => setIp(e.target.value)} value={ip} className="form-control" aria-label="Small" placeholder="Ingresar Dirección IP" />
    </div>
    <div className='btnAction-h'>
      <div className='btnContainer'>
        <button onClick={addIp} type="button" className="btn btn-primary btn-sm btn-block">
          <i className="bi bi-cloud-arrow-up">
          </i>
          <span> Procesar</span>
        </button>
        <button onClick={fetchData} type="button" className="btn btn-primary btn-sm btn-block">
          <i className="bi bi-arrow-clockwise"></i>
          <span> Actualizar</span>
        </button>
      </div>

    </div>
    <br />
    <DataGrid
      rows={rows}
      columns={columns}
      pageSize={5}
      rowsPerPageOptions={[5]}

    />
  </div></div >
}

export default Home;