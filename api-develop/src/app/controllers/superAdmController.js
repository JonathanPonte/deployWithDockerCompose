const express = require('express');
const authmiddleware = require('../middlewares/authSuperAdm');
const bcrypt = require('bcryptjs');

const Adm = require('../models/Adm');
const User = require('../models/User');
const Category = require('../models/Category');
const Scale = require('../models/Scale');
const Question = require('../models/Question');
const type = require('../util/util.json');

const crypto = require('crypto');
const fs = require('fs');
const Path = require('path');

const router = express.Router();

async function cryptoPassword(password) {
    const hash = await bcrypt.hash(password, 10);

    return hash
}

router.use(authmiddleware);

//criar novo superAdm - Ok
async function createSuperAdm(req, res) {
    const { name, user } = req.body;
    var { email, password } = user;

    try {
        if (await User.findOne({ email }))
            return res.status(403).send({ error: 'User Already exists' });

        const adm = await Adm.create({ name });
        password = await cryptoPassword(password);
        const user = await User.create({ email, password });
        await user.save();

        adm.user = user;
        adm.type = type.SuperAdm;

        await adm.save();

        return res.status(201).send({ "Status": "201Created" });
    } catch (error) {
        console.log(error)
        return res.status(400).send({ error: 'Error register' });
    }
}

async function deleteAdm(req, res) {
    const _id = req.params.id
    try {
        const adm = await Adm.findByIdAndDelete(_id);

        await User.deleteOne({_id: adm.user});

        res.status(200).send()
    } catch (error) {
        return res.status(400).send({ error: 'Error update super adm' });
    }
}


//modificar senha - Ok
async function resetPassword(req, res) {

    try {
        var { id, email, currentPassword, newPassword, confirmationPassword } = req.body;

        if (!id && !email && !currentPassword && !newPassword && !confirmationPassword)
            return res.status(400).send({ error: 'All data must be completed' });

        const user = await User.findOne({ email }).select('+password');

        if (!user)
            return res.status(400).send({ error: 'User not found' });

        if (!await bcrypt.compare(currentPassword, user.password))
            return res.status(400).send({ error: 'Current password is invalid' });

        if (!(newPassword === confirmationPassword))
            return res.status(400).send({ error: 'Passwords must be equal' });

        const password = await cryptoPassword(newPassword);

        const userModify = await User.findByIdAndUpdate(id, {
            email,
            password
        }, { new: true });

        await userModify.save();

        return res.status(200).send({ Status: '200 OK' });
    } catch (error) {
        console.log(error);
        return res.status(400).send({ error: 'Error update super adm' });
    }

}




//criar novo adm Coletor - Ok
async function createCollectorAdm(req, res) {
    const { name, user } = req.body;
    var { email, password } = user;

    try {
        if (await User.findOne({ email }))
            return res.status(403).send({ error: 'User Already exists' });

        const adm = await Adm.create({ name });
        password = await cryptoPassword(password);
        const user = await User.create({ email, password });
        await user.save();

        adm.user = user;
        adm.type = type.CollectorAdm;

        await adm.save();

        return res.status(201).send({ adm });
    } catch (error) {
        console.log(error)
        return res.status(400).send({ error: 'Error register' });
    }

}


async function getAdms(req, res) {

    try {
        const adms = await Adm.find();

        return res.send(adms);
    } catch (error) {

    }

}

// crud Categorias

//criação da categoria - Ok (PROCURAR COMO FAZ UPLOAD DE IMAGEM)
async function createCategory(req, res) {
    let { admId, title, image, imageExtension, description } = req.body;
    try {
        const adm = await Adm.findById(admId);

        if (!adm)
            return res.status(401).send({ erro: 'Adm not found' });

        await base64ToFile(image, imageExtension, async name => {
            image = name;
            const category = await Category.create({ title, image, description });
            await category.save();

            return res.status(201).send({ category });
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({ error: 'Error create category' });
    }
}

async function base64ToFile(base64, extension, cb) {
    var fileName = "";

    const name = await crypto.randomBytes(16, (err, hash) => {
        fileName = `${hash.toString('hex')}-image${extension}`;
        const base64file = base64.split(';base64,').pop();


        fs.writeFile('./src/uploads/' + fileName, base64file, { encoding: 'base64' }, function (err) {
            console.log('file created');
        });

        //console.log(fileName);

        fileName = "file/image/" + fileName;

        cb(fileName);
    })

}

async function uploadImage(req, res) {

    try {
        const file = req.file

        console.log(req.body);


        return res.send({ file });
    } catch (error) {
        return res.status(400).send({ error: 'Error create exercise' });
    }
}

async function getImage(req, res) {
    try {

        // fs.unlinkSync(Path.join(__dirname, '../../uploads/' + req.params.fileName));

        return res.sendFile(Path.join(__dirname, '../../uploads/' + req.params.fileName));
    } catch (error) {
        console.log(error);

    }
}

async function deleteImage(fileName) {
    try {

        fs.unlinkSync(Path.join(__dirname, '../../uploads/' + fileName));

    } catch (error) {
        console.log(error);

    }
}


//update da categoria - OK
async function updateCategory(req, res) {
    const { title, image, description } = req.body
    try {
        const category = await Category.findByIdAndUpdate(req.params.categoryId, {
            title,
            image,
            description
        }, { new: true });

        await category.save();

        return res.send({ category });
    } catch (error) {
        console.log(error);
        return res.status(400).send({ error: 'Error update category' });
    }
}


//Delete da categoria - Ok
async function deleteCategory(req, res) {
    try {
        const category = await Category.findByIdAndDelete(req.params.categoryId);

        return res.send();
    } catch (error) {
        return res.status(400).send({ error: 'Error deleting project' });
    }
}

// CRUD escala

//create escala - OK
async function createScale(req, res) {
    let { title, informations, minLabel, maxLabel, minScaleValue, maxScaleValue, correctScores, questions, extension, image, imageName } = req.body;
    console.log(title);
    try {

        base64ToFile(image, extension, async name => {
            image = name;
            const scale = await Scale.create({ title, informations, minLabel, maxLabel, minScaleValue, maxScaleValue, correctScores, image, imageName });
            var questionsScale = []

            await Promise.all(questions.map(async q => {
                const { question } = q;
                const questionCopy = new Question({ title: question });
                await questionCopy.save();
                questionsScale.push(questionCopy);
            }));

            scale.questions = questionsScale;

            await scale.save();

            return res.send({ scale });
        });


    } catch (error) {
        console.log(error);
        return res.status(400).send({ error: 'Error create scale' });
    }
}

async function updateScale(req, res) {
    const { _id, title, informations, minLabel, maxLabel, minScaleValue, maxScaleValue, image, imageName, extension, questions } = req.body;
    try {

        const scale = await Scale.findById(_id);


        //adicionar novas escalas;

        if (!image.includes("/file")) {
            fs.unlinkSync(Path.join(__dirname, '../../uploads/' + scale.image.split("/")[2]));
            base64ToFile(image, extension, async fileName => {
                const scaleI = await Scale.findById(_id);
                scaleI.title = title;
                scaleI.informations = informations;
                scaleI.minLabel = minLabel;
                scaleI.maxLabel = maxLabel;
                scaleI.minScaleValue = minScaleValue;
                scaleI.maxScaleValue = maxScaleValue;
                scaleI.imageName = imageName;
                scaleI.image = fileName;

                questions.map( question => {

                    if(question._id){
                        console.log("opa");
                    }else{  
                        console.log("deu bom");
                    }

                })

                await scaleI.save();

                return res.send({ scaleI });
            })
        } else {
            const scaleI = await Scale.findById(_id);
            scaleI.title = title;
            scaleI.informations = informations;
            scaleI.minLabel = minLabel;
            scaleI.maxLabel = maxLabel;
            scaleI.minScaleValue = minScaleValue;
            scaleI.maxScaleValue = maxScaleValue;
            scaleI.imageName = imageName;
            await scaleI.save();
            return res.send({ scale });
        }

    } catch (error) {
        console.log(error);
        return res.status(400).send({ Error: 'Error updade scale' });
    }
}


async function getScale(req, res) {
    const _id = req.params.id;
    try {
        const scale = await Scale.findById(_id).populate('questions');;

        return res.send(scale);
    } catch (error) {
        return res.status(400).send({ Error: 'Error get scale' })
    }

}

//delete escala
async function deleteScale(req, res) {
    try {

        console.log(req.params.scaleId);
        const scale = await Scale.findByIdAndDelete({ _id: req.params.scaleId });

        await deleteImage(scale.image.split("/")[2]);

        return res.send()
    } catch (error) {
        console.log(error);
        return res.status(400).send({ error: 'Error deleting scale' });
    }
}




module.exports = {
    createSuperAdm,
    resetPassword,
    createCollectorAdm,
    uploadImage,
    getImage,
    createCategory,
    updateCategory,
    deleteCategory,
    createScale,
    deleteScale,
    deleteAdm,
    getScale,
    getAdms,
    updateScale
};