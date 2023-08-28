import './login.css'
import { useContext, createRef } from 'react';
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
        const capcha = recaptchaRef.current.execute();
        const recaptchaValue = recaptchaRef.current.getValue();

        const data = {
            username: username,
            password: password
        };
        const headers = {
            'Content-Type': 'application/json'
        };
        postData('/auth/login', data, headers)
            .then(response => {
                console.log(response.response);
                if (response.error) {
                    throw new Error(response.response.error);
                }
                if (response.message) {
                    throw new Error(response.response.message);
                }
                value.setLoading(false);
                value.handleToken(response.response.token);
                navigate("/");
            }).catch(error => {
                const err = error.message ? error.message : error;

                notification("danger", "Login ", err);
                value.setLoading(false);
            });


    }
    return <div className="login">
        {<ReCAPTCHA
            ref={recaptchaRef}
            size="invisible"
            sitekey="Your client site key"
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