import './login.css'
import { useContext, createRef, useEffect } from 'react';
import { StorageContext } from '../storage/storageContext';
import { notification } from '../util/util'
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";

import { postData } from '../api/apiService.ts'
function Login() {
    const value = useContext(StorageContext);
    const { username, password } = value.storage.user;
    const navigate = useNavigate();
    const recaptchaRef = createRef();

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


    const login = () => {
        if (username === "") {
            notification("warning", "Validación de campos ", "Usuario no puede estar vacia");

            return;
        }
        if (password === "") {
            notification("warning", "Validación de campos ", "Password no puede estar vacia");

            return;
        }
        value.setLoading(true);
        const capcha = recaptchaRef.current;

        capcha.execute().then( (toke) => {
            const data = {
                username: username,
                password: password,
                captchaResponse: toke
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
        })
    }
    console.log(value.externalSiteKey)
    return <div className="login">
        {<ReCAPTCHA
            ref={recaptchaRef}
            size="invisible"
            sitekey={value.externalSiteKey}
        //  onChange={onChange}
        />}
        <div className="center">
            <img alt="Grupo Puerto Cartagena" className="login-img" src={process.env.PUBLIC_URL + '/img/logo-grupo.svg'} ></img>
            <h4>Login</h4>
            <br />
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
                <button onClick={login} style={{ width: "100%" }} type="button" className="btn btn-primary btn-sm btn-block">
                    Login
                </button>

            </div>
        </div >
    </div >
}

export default Login;