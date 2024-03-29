import React, {useState, useEffect} from "react";
import storageData from './stateInitial';

export const StorageContext = React.createContext({});
export const StorageProvider = (props) => {
    //Estorage globar con la información del estado de la aplicación
    const getStorage = localStorage.getItem("storage");
    const [storage, setStorage] = useState(getStorage === null || getStorage === 'null' ? storageData : JSON.parse(localStorage.getItem("storage")));
    const [token, setToken] = useState(localStorage.getItem("token") === null ? null : localStorage.getItem("token"));
    const [externalSiteKey, setExternalSiteKey] = useState("");
    const [page, setPage] = useState("");

    /**
     * Cada vez que se ejecute un cambio en cualquier dato del storage
     *  se guarda en el local storage la información
     */
    useEffect(() => {

        localStorage.setItem('storage', JSON.stringify(storage));
    }, [storage]);

    useEffect(() => {
        localStorage.setItem('token', token);
    }, [token]);


    const handleToken = (varToken) => {
        setToken(varToken);
    };

    const setLoading = (value) => {
        setStorage({
            ...storage,
            loading: value
        });
    }
    const setClearUser = () => {
        setStorage({
            ...storage,
            loading: false,
            user: { username: '', password: '' }
        });
    }
    const setUserInfo = (prop) => (event) => {
        const propValue = (prop === 'username') ? event.target.value.toUpperCase() : event.target.value;
        setStorage({
            ...storage,
            user: { ...storage.user, [prop]: propValue }
        });

    }




    return (<StorageContext.Provider
        value={{
            storage,
            token,
            externalSiteKey,
            setExternalSiteKey,
            handleToken,
            page,
            setLoading,
            setUserInfo, 
            setClearUser,
            setPage
        }}
    >
        {props.children}
    </StorageContext.Provider>)
}