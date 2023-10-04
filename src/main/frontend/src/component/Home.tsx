import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React, { useState, useEffect, useCallback, useContext, Fragment } from 'react';
import { Button } from '@mui/material';
import './home.css'
import { ipMaster } from '../dto/ipMaster';
import { StorageContext } from '../storage/storageContext';
import { getData, postData, deleteData ,logout} from '../api/apiService.ts';
import { notification, ipValid } from '../util/util';
import Swal from 'sweetalert2';

import { useNavigate } from 'react-router-dom';

const showConfirmationDialog = (
    message: string='mensaje',
    confirmCallBack 
    ) => {
  Swal.fire({
    title: '¿Estás seguro?',
    text: message,
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      confirmCallBack();
    } 
  })
}

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
    if(params.row.state.trim()==="ACEPTADO"){
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
            eventDelete(params.row)
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

    await getData('/ip_master', value.token)
      .then(response => {
        value.setLoading(false);
        if(validate401(response)){
          return;
        }

        if ( response.status!=='200' && response.error) {
          throw new Error(response.message);
        }
        setRows(response.response);
      }).catch(error => {
        if(!validate401(error)){
        value.setLoading(false);
        const err = error.message ? error.message : error;
        notification("danger", "Listando Ip ", err);
      }
      });

  }, [])

  /**
   * Metodo que se ejecuta cada vez que se actualiza el estado.
   */
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const postIp = ( data: ipMaster ) => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + value.token
    };
    postData('/ip_master', data, headers)
      .then(response => {
        const message = response.message;
        if ( response.status!=='200' && response.error) {
          throw new Error(message);
        }
        fetchData();
        setIp("");
        notification("info", "Procesando Ip ", message);
      })
      .catch(error => {
        const err = error.message ? error.message : 'Error al procesar la IP';
        notification("danger", "Procesando Ip ", err);
      });
  }

  const addIp = () => {

    if (ip === "") {
      notification("warning", "Validación de campos ", "Ip no puede estar vacia");
      return;
    }

    if (!ipValid(ip)) {
      notification("warning", "Validación de campos ", "Debe escribir una ip Valida");
      return;
    }
    const data: ipMaster = {
      ipAddress: ip
    }

    const existingIp = rows.find((ip) => ip.ipAddress.trim() === data.ipAddress);

    if (existingIp) {
      showConfirmationDialog("¿Quiere actualizar la ip? ya se encuentra registrada.", () => {
        postIp(existingIp);
      });
    } else {
      postIp(data);
    }

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
    showConfirmationDialog(`¿Quieres eliminar la IP ${val.ipAddress}?`, () => {
      deleteData('/ip_master/' + val.id,  value.token)
      .then(response => {
        validate401(response);
        const message = response.message;
        if ( response.error) {
          throw new Error(message);
        }
        value.setLoading(false);
        fetchData();
        notification("info", "Eliminando Ip ", message);

      })
      .catch(error => {
        value.setLoading(false);
        notification("danger", "Eliminando Ip ", error);
      });
    })
  }

  return <div className='principal'><div style={{ height: 400, minWidth: '650px' }}>
    <img alt="Grupo Puerto Cartagena" className="login-img" src={process.env.PUBLIC_URL + '/img/logo-grupo.svg'} ></img>
    <div style={{   display:"flex", justifyContent:"space-between", padding: "2rem 0 1rem" }}>
    <h4>Registro de IP</h4> 
    <button onClick={e=>logoutdData()} type="button" className="btn btn-primary btn-sm btn-block">
      <i title='LOGOUT' className="bi bi-box-arrow-left"></i>
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