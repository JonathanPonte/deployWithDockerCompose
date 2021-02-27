import api from '../Api'



async function ScaleWithQuestion(scaleID, token, cb) {

    api.get("/user/" + scaleID, {
        headers: {
            authorization: 'Bearer ' + token
        }

    }).then(e => {

        cb(e.data.scaleQuestions);
    
    }).catch()

}


export default { ScaleWithQuestion }