import history from "../history";

// import api from './Api';
export const TOKEN = "@token";

// Dados de sessão de usuário.
export const isAuthenticatedAdm = () => {
    if(sessionStorage.getItem("persist:projEmpre") !== null){
        const state = JSON.parse(sessionStorage.getItem("persist:projEmpre"));
        const obj = JSON.parse(state.user);
        const token = obj.session.token;
        if(obj.session.adm) {
            return token ? true : false;
        }
        return false;
    }
    return false;
}

export const isAuthenticatedPeople = () => {
    if(sessionStorage.getItem("persist:projEmpre") !== null){
        const state = JSON.parse(sessionStorage.getItem("persist:projEmpre"));
        const obj = JSON.parse(state.user);
        const token = obj.session.token;
        if(obj.session.people) {
            return token ? true : false;
        }
        return false;
    }
    return false;
}

export const getToken = () => {
    if(sessionStorage.getItem(TOKEN)){
        const state = JSON.parse(sessionStorage.getItem("persist:projEmpre"));
        const obj = JSON.parse(state.user);
        const token = obj.session.token;
        return token;
    }
    return "";
}
export const login = (token) => sessionStorage.setItem(TOKEN, token);

export const logout = () => {
    sessionStorage.clear();
    history.push('/');
    window.location.reload();
};

// Acesso rapido ao headers da sessão.
export const headers = {
    token : getToken(),
}
  