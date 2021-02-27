const express = require('express');
const authmiddleware = require('../middlewares/authColletorAdm');
const bcrypt = require('bcryptjs');
const path = require('path');

const createCsvWriter = require('csv-writer').createObjectCsvWriter
const Scale = require('../models/Scale');
const AsnwersOfPeople = require('../models/AnswersOfPeople');
const People = require('../models/People');

const router = express.Router();


// get .csv file
async function getCsvFile(req, res) {
    const headerItens = [];
    headerItens.push({ id: 'name', title: 'Nome' });
    headerItens.push({ id: 'email', title: 'Email' });
    headerItens.push({ id: 'birthdate', title: 'Data de nascimento' });

    try {
        const scale = await Scale.findById(req.params.scaleId).populate(['questions']);

        if (!scale)
            return res.status(400).send({ error: 'Scale does not exists' });

        await Promise.all(scale.questions.map(question => {
            const id = question._id;
            const title = question.title;
            headerItens.push({ id, title });
        }))

        const data = [];
        const asnwersOfPeoples = await AsnwersOfPeople.find({ scale: scale }).populate(['people', 'answers']);


        await Promise.all(asnwersOfPeoples.map( async aop => {
            var item = {};
            const people = await People.findById({_id: aop.people._id}).populate(['user']);
            // console.log("data: " + people.birthdate);
            item["name"] = people.name;
            item["email"] = people.user.email;
            item["birthdate"] = people.birthdate;
    
            headerItens.map(header => {
                aop.answers.map(answer => {

                    if (header.id == answer.question.toString()) {

                        item[header.id] = answer.result;

                    }

                })
            })

            data.push(item);

        }));

        console.log(headerItens)
        console.log(data)

        const pathFile = "src/data/"; 
        const fileName = scale.title + ".csv";
        const pathName = pathFile + fileName;


        const csvWriter = createCsvWriter({
            path: pathName,
            header: headerItens
        });

        await csvWriter.writeRecords(data)

        res.attachment(fileName);
        return res.sendFile(path.join(__dirname, "../../data/" + fileName));
    } catch (error) {
        console.log(error)
        return res.status(400).send({ error: 'Error answer scale' });
    }

}

module.exports = { getCsvFile };