import api from '../Api';
import { message } from 'antd';

async function ServiceSingUp(people){
   
    await api.post('/auth/register', people).then(response => {

        if (response.status == 201) {
            message.success("Usuário criado");
            window.location.href = "/";
        }

    }).catch(e => {

        if (e.response.status == 403) {
            message.warning("Usuario já existe");
        }

    });


}


export default { ServiceSingUp }