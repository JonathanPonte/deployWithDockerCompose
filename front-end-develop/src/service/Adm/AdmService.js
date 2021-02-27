import api from '../Api'
import { message } from 'antd';


async function getAdmins(token, cb) {

    await api.get("/adm", {
        headers: {
            authorization: 'Bearer ' + token
        }

    }).then( response => {

        var listAdms = [];

        listAdms = response.data;

        cb(listAdms);

    }).catch( e =>{

        console.log("Erro: " + e.response);

    })

}

async function deleteAdm(admId, token, cb){
    await api.delete("/adm/" + admId, {
        headers: {
            authorization: 'Bearer ' + token
        }

    }).then( response => {

        cb(response);

    }).catch( e =>{

        console.log("Erro: " + e.response);

    })
}


export default { getAdmins , deleteAdm}