import './login.css';
import { useContext, createRef, useEffect } from 'react';
import { StorageContext } from '../storage/storageContext';
import { notification } from '../util/util';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";

import { postData } from '../api/apiService.ts'
import Captcha from '../util/Captcha';


function Login() {
    const value = useContext(StorageContext);
    const { username, password } = value.storage.user;
    const navigate = useNavigate();
    const recaptchaRef = createRef();
    const captcha = new Captcha(value.externalSiteKey, "submit");


    useEffect(() => {
        value.setLoading(false)
        value.setClearUser();
        const fetchExternalConfig = async () => {
          try {
            const response = await fetch("/config/external_siteKey");
            const data = await response.text();
            value.setExternalSiteKey(data);
          } catch (error) {
            notification("danger", "Error al obtener la configuración", error.message);
          }
        };
    
        fetchExternalConfig();
      }, []);


    const login = async() => {
        if (username === "") {
            notification("warning", "Validación de campos ", "Usuario no puede estar vacia");
            return;
        }
        if (password === "") {
            notification("warning", "Validación de campos ", "Password no puede estar vacia");
            return;
        }
        value.setLoading(true);
        const token = await captcha.getToken();
        // Validar el token
        if (!token) {
            notification("danger", "Login ", "No se pudo obtener el token de reCAPTCHA");
            value.setLoading(false);
            return;
        }
        const data = {
            username: username,
            password: password,
            captchaResponse: token
        };
        const headers = {
            'Content-Type': 'application/json'
        };
        postData('/auth/login', data, headers)
            .then(response => {
                if (response.status &&response.status!=='200') {
                    throw new Error(response.message);
                }
                value.setLoading(false);
                value.handleToken(response.response.token);
                navigate("/");
            }).catch(error => {
                const err = error.message ? error.message : 'Usuario y/o contraseña errónea';
                notification("danger", "Login ", err);
                value.setLoading(false);
            });
    }
    const handleSubmit = async (event) => {
        event.preventDefault(); 
        await login();
    };
    if(!value.externalSiteKey) {    
        return (<div> Cargando configuraciones </div>)
    };
    return <div className="login">
        {<ReCAPTCHA
            ref={recaptchaRef}
            size="invisible"
            sitekey={value.externalSiteKey}
        />}
        <div className="center">
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
                <td>
                </td>
                <td className='titlePage'>
                Login
                </td>
            </tr>
            </table>
            <br />
            <form onSubmit={handleSubmit}>
                <div className="input-group input-group-lg mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" style={{ height: "100%" }}>
                            <i className="bi bi-person-fill"></i>
                        </span>
                    </div>
                    <input type="text" onChange={value.setUserInfo("username")} autoComplete="off" value={username} className="form-control" aria-label="Small" placeholder="Ingresar Usuario" />
                </div>
                <div className="input-group input-group-lg mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" style={{ height: "100%" }}>
                            <i className="bi bi-lock-fill"></i>
                        </span>
                    </div>
                    <input type="password" onChange={value.setUserInfo("password")} autoComplete="off" value={password} className="form-control" aria-label="Small" placeholder="Ingresar Password" />
                </div>
                <div className='btnAction'>
                    <button onClick={login} style={{ width: "100%" }} type="submit" className="btn btn-primary btn-sm btn-block">
                        Login
                    </button>
                </div>
            </form>
        </div >
    </div >
}

export default Login;