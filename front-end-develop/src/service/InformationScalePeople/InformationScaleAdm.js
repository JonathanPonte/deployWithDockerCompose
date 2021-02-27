import api from '../Api'



async function InformationScale(scaleID, token, cb) {
    api.get("/adm/scale/" + scaleID, {
        headers: {
            authorization: 'Bearer ' + token
        }

    }).then(e => {

        cb(e.data);
    
    }).catch()
}

async function DeleteScale(scaleID, token, cb){
    api.delete("/adm/scale/" + scaleID, {
        headers: {
            authorization: 'Bearer ' + token
        }

    }).then(e => {

        cb(e.data);
    
    }).catch( e =>{
        console.log(e.response);
    }
    )
}

async function DownloadCDV(scaleID, token, cb){
    api.delete("/collector/scale/" + scaleID, {
        headers: {
            authorization: 'Bearer ' + token
        }

    }).then(e => {

        cb(e.data);
    
    }).catch( e =>{
        console.log(e.response);
    }
    )
}



export default { InformationScale, DeleteScale, DownloadCDV }