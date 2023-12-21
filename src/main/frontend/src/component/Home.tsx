import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React, { useState, useEffect, useCallback, useContext, Fragment } from 'react';
import { Button, Tooltip } from '@mui/material';
import './home.css'
import { ipMaster } from '../dto/ipMaster';
import { StorageContext } from '../storage/storageContext';
import { getData, postData, deleteData ,logout} from '../api/apiService.ts';
import { notification, ipValid, validateOctetos } from '../util/util';
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
    cancelButtonText: 'No',
    reverseButtons: true,
    focusCancel: true
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
    { field: 'ipAddress', headerName: 'Dirección IP', width: 130, hideSortIcons: false, disableColumnMenu: true, headerClassName: 'dataGrid-header',  },
    { field: 'state', headerName: 'Estado', width: 110, hideSortIcons: false, disableColumnMenu: true, headerClassName: 'dataGrid-header', },
    { 
      field: 'message',
      headerName: 'Motivo Rechazo', 
      width: 402, 
      renderCell: (params) => (
          <Tooltip title={params.value}>      
          <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>        
            {params.value}      
          </div>
        </Tooltip>
      ),
      hideSortIcons: false, disableColumnMenu: true, headerClassName: 'dataGrid-header',
    },
    {
      field: 'col5',
      headerName: 'Eliminar',
      width: 82,
      renderCell: renderDetailsButton, 
      hideSortIcons: true, disableColumnMenu: true, headerClassName: 'dataGrid-header',
    },
  ];


  const validate401 = (response) => {
   
      if (response.status === '401') {
        value.setLoading(false);
        localStorage.clear();
        value.handleToken(null);
        value.setClearUser();
        notification("danger", "La sesión caducó","Su token no es valido. Por favor loguearse nuevamente");
        navigate("/login");
        return true;
      }
      return false;
    
  }
  

  const fetchData = useCallback(async () => {
    value.setLoading(true);

    await getData('/ip_master', value.token)
      .then(response => {
        if (validate401(response)) return;
        value.setLoading(false);
        
        if ( response.status!=='200' && response.error) {
          throw new Error(response.message);
        }
        setRows(response.response);
      }).catch(error => {
        value.setLoading(false);
      const err = error.message ? error.message : error;
      notification("danger", "Listando IPs ", err);
      });

  }, [])

  /**
   * Metodo que se ejecuta cada vez que se actualiza el estado.
   */
  useEffect(() => {
    value.setPage("home-fullscreen");
    fetchData();
  }, [fetchData]);

  const postIp = ( data: ipMaster ) => {
    value.setLoading(true);
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + value.token
    };
    postData('/ip_master', data, headers)
      .then(response => {
        if (validate401(response)) return;
        value.setLoading(false);
        const message = response.message;
        if ( response.status && response.status!=='200' ) {
          throw new Error(message);
        }
        fetchData();
        setIp("");
        notification("info", "Procesando IP ", message);
      })
      .catch(error => {
        value.setLoading(false);
        const err = error.message ? error.message : 'Error al procesar la IP';
        notification("danger", "Procesando IP ", err);
      });
  }

  const addIp = () => {

    if (!ipValid(ip)) {
      notification("warning", "Solo IPs públicas ", "Debe escribir una IP válida");
      return;
    }

    if (!validateOctetos(ip)) {
      notification("warning", "Validación de campos ", "Recuerda que los octetos de la IP no deben comenzar con cero, a menos que sean solo cero.");
      return;
    }

    const data: ipMaster = {
      ipAddress: ip
    }

    const existingIp = rows.find((ip) => ip.ipAddress.trim() === data.ipAddress);

    if (existingIp) {
      showConfirmationDialog(`¿Quieres cambiar el estado de la IP ${ip} a PENDIENTE?`, () => {
        postIp(existingIp);
      });
    } else {
      postIp(data);
    }

  };

const logoutdData=()=>{
  const username = value.storage.user.username;
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
        if (validate401(response)) return;
        value.setLoading(false);
        validate401(response);
        const message = response.message;
        if ( response.status && response.status != '200' ) {
          throw new Error(message);
        }
        fetchData();
        notification("info", "Eliminando IP ", message);

      })
      .catch(error => {
        value.setLoading(false);
        notification("danger", "Eliminando Ip ", error);
      });
    })
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (ip === "") {
      notification("warning", "Validación de campos ", "IP no puede estar vacía");
      return;
    }
    await addIp();
  };

  return <div className='principal'><div style={{ height: 400, minWidth: '650px' }}>
    <table className="header">
    <tr>
        <td className='logoSprc'>
          <img src={process.env.PUBLIC_URL + '/img/Logo-sprc.png'} alt="Logo SPC" ></img>
        </td>
        <td className=''>

        </td>
        <td className='logoContecar'>
          <img src={process.env.PUBLIC_URL + '/img/Logo-cnr.jpg'} alt="Logo cnr" ></img>
        </td>
    </tr>
    <tr>
        <td className='logoVigilado'>
          <img src={process.env.PUBLIC_URL + '/img/Logo-vigilado.png'} className="logoVigilado" alt="Logo vigilado" ></img>
        </td>
        <td className='titlePage'>
          Solicitar Autorización de IPs Públicas
        </td>
    </tr>
    </table>
    <div style={{   display:"flex", justifyContent:"space-between", padding: "2rem 0 1rem" }}>
    <h4>Registro de IP</h4> 
    <div className="dropdown">
      <button className="btn btn-outline-primary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
      <i title='USER' className="bi bi-person-fill"> {value.storage.user.username}</i>
      </button>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        <li>
          <a className="dropdown-item" href="#" onClick={e=>logoutdData()}>
            <i title='LOGOUT' className="bi bi-box-arrow-left"></i> Cerrar sesión
          </a>
        </li>
      </ul>
    </div>
    </div>
    <form onSubmit={handleSubmit}>
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
          <button type="submit" className="btn btn-primary btn-sm btn-block">
            <i className="bi bi-cloud-arrow-up">
            </i>
            <span> Guardar</span>
          </button>
          <button onClick={fetchData} type="button" className="btn btn-secondary btn-sm btn-block">
            <i className="bi bi-arrow-clockwise"></i>
            <span> Refrescar</span>
          </button>
        </div>
      </div>
  </form>
    <br />
    <DataGrid
      rows={rows}
      columns={columns}
      pageSize={5}
      rowsPerPageOptions={[5]}
      initialState={{
        sorting: {
          sortModel: [
            {
              field: 'state',
              sort: 'desc',
            }
          ]
        }
      }}
    />
  </div></div >
}

export default Home;