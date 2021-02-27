import {put, call, select, fork, takeLatest, all} from "redux-saga/effects";
import { ONLOGGIN, onLoginSuccess, onLoginFailed } from "./actions";
import { isAuthenticatedAdm, isAuthenticatedPeople, login, logout } from "../../service/Auth";
import api from "../../service/Api";
import history from "../../history";
import { message } from 'antd';

function* onLoggin({email, password}) {
    
    try {
        const response = yield api.post("auth/login", { email, password });
        // console.log("ASADASDSADASDAS");
        // console.log("Dados: ", email, password);
        // console.log("Response: ", response.data);
        // console.log("ADM1: ",isAuthenticatedAdm());
        // console.log("PEOPLE1: ",isAuthenticatedPeople());

        yield put(onLoginSuccess(response.data));
        login(response.data.token);
        history.push('/');
        window.location.reload();
        
    }catch(error){
        yield put(onLoginFailed(error));
        message.warning("Usuário não encontrado");
    }
}

export default all([ 
    takeLatest(ONLOGGIN, onLoggin)
])