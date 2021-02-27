import api from '../Api'



async function NewScale(newScale, token, cb) {
    api.post("/adm/scale", newScale, {
        headers: {
            authorization: 'Bearer ' + token
        }

    }).then(e => {

        cb(e.data);
    
    }).catch()
}


export default { NewScale }