import api from '../Api'



async function ScaleListing(cb){
    api.get("/auth/scale").then(response => {

        console.log(response);

        cb(response.data.scalesUser);

    }).catch(e => {

        console.log("Erro: " + e.response);

    })
}



export default {ScaleListing}