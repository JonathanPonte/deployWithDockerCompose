import api from '../Api'



async function InformationScalePeople(scaleID, userID, token, cb) {
    api.get("/user/" + scaleID + "/" + userID, {
        headers: {
            authorization: 'Bearer ' + token
        }

    }).then(e => {

        cb(e.data);
    
    }).catch()
}




export default { InformationScalePeople }