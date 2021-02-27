const fs = require('fs');
const Path = require('path');

async function getImage(req, res) {
    try {
        
        // fs.unlinkSync(Path.join(__dirname, '../../uploads/' + req.params.fileName));
        
        return res.sendFile(Path.join(__dirname, '../../uploads/' + req.params.fileName)); 
    } catch (error) {
        console.log(error);
        
    }
}



module.exports = { getImage};