import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React, { useState, useEffect, useCallback, useContext } from 'react';
import { Button } from '@mui/material';
import './home.css'
import { ipMaster } from '../dto/ipMaster';
import { StorageContext } from '../storage/storageContext';
import { getIp, postData, deleteData } from '../api/apiService.ts'
import { notification, ipValid } from '../util/util'

import { useNavigate } from 'react-router-dom';

function Home() {
  const value = useContext(StorageContext);
  const [ip, setIp] = useState("");
  const [description, setDescription] = useState("");
  const [rows, setRows] = useState<ipMaster[]>([]);
  const navigate = useNavigate();

  /**
   * Definición de componente button que va en la tabla
   * @param params 
   * @returns 
   */
  const renderDetailsButton = (params) => {
    return (
      <strong>
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{ marginLeft: 16 }}
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
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'ipAddress', headerName: 'Dirección IP', width: 200 },
    { field: 'name', headerName: 'Descripcion', width: 240 },
    {
      field: 'col5',
      headerName: 'Eliminar',
      width: 130,
      renderCell: renderDetailsButton
    },
  ];






  const fetchData = useCallback(async () => {
    value.setLoading(true);

    getIp(process.env.REACT_APP_URL + '/ip_master', value.token)
      .then(response => {

        if (response.error) {
          if (response.status === '401') {
            value.setLoading(false);
            localStorage.clear();
            value.handleToken(null);
            value.setClearUser();
            notification("danger", "Listando Ip ", response.error);
            navigate("/");
            return;
          }
        }

        if (response.message) {
          throw new Error(response.message);
        }

        setRows(response);
        value.setLoading(false);
      }).catch(error => {

        const err = error.message ? error.message : error;
        notification("danger", "Listando Ip ", err);
        value.setLoading(false);
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

    if (description === "") {
      notification("warning", "Validación de campos ", "Descripción no puede estar vacia");
      return;
    }

    if (!ipValid(ip)) {
      notification("warning", "Validación de campos ", "Debe escribir una ip Valida");
      return;
    }
    const data: ipMaster = {
      ipAddress: ip,
      name: description
    }
    value.setLoading(true);
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + value.token
    };
    postData(process.env.REACT_APP_URL + '/ip_master', data, headers)
      .then(response => {
        console.log(response);
        if (response.error) {
          throw new Error(response.error);
        }
        if (response.message) {
          throw new Error(response.message);
        }
        value.setLoading(false);
        fetchData();
        setIp("");
        setDescription("");
      })

      .catch(error => {
        const err = error.message ? error.message : error;

        notification("danger", "Guardando Ip ", err);
        value.setLoading(false);
      });

  };





  /**
   * Medoto para eliminar una ip 
   * @param val 
   */
  const eventDelete = (val) => {
    deleteData(process.env.REACT_APP_URL + 'ip_master/' + val, value.token)
      .then(e => {
        fetchData();
      })
      .catch(error => {
        notification("danger", "Eliminando Ip ", error);
        value.setLoading(false);
      });
  }

  return <div className='principal'><div style={{ height: 400, minWidth: '650px' }}>
    <img alt="Grupo Puerto Cartagena" className="login-img" src={process.env.PUBLIC_URL + '/img/logo-grupo.svg'} ></img>
    <h4>Registro de Ip</h4>
    <br />
    <div className="input-group input-group-lg mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text" style={{ height: "100%" }}>

          <i className="bi bi-person-fill"></i>
        </span>
      </div>
      <input type="text" onChange={e => setIp(e.target.value)} value={ip} className="form-control" aria-label="Small" placeholder="Ingresar Dirección Ip" />
    </div>
    <div className="input-group input-group-lg mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text" style={{ height: "100%" }}>

          <i className="bi bi-person-fill"></i>
        </span>
      </div>
      <input type="text" onChange={e => setDescription(e.target.value)} value={description} className="form-control" aria-label="Small" placeholder="Ingresar Descripción" />
    </div>
    <div className='btnAction-h'>
      <button onClick={addIp} style={{ width: "50px", float: 'left', marginRight: '5px' }} type="button" className="btn btn-primary btn-sm btn-block">
        <i className="bi bi-plus"></i>
      </button>
      <button onClick={fetchData} style={{ width: "50px", float: 'left' }} type="button" className="btn btn-primary btn-sm btn-block">
        <i className="bi bi-arrow-clockwise"></i>
      </button>

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