import api from '../Api'
import { message } from 'antd';


async function Answers(answerScale, token, cb) {

    await api.post('user/scale', answerScale, {
        headers: {
            authorization: 'Bearer ' + token
        }

    }).then(response => {

        console.log(response);
        cb(response)


    }).catch(e => {

        console.log(e);
        message.warning("Problema com servidor");

    });


}


export default { Answers }