import api from '../Api'
import { message } from 'antd';


async function EditScale(scale, token, cb) {

    await api.put('/adm/scale', scale, {
        headers: {
            authorization: 'Bearer ' + token
        }

    }).then(response => {

        console.log(response);
        cb(response)


    }).catch(e => {

        console.log(e.response);
        message.warning("Problema com servidor");

    });


}


export default { EditScale }