const express = require('express');
const authmiddleware = require('../middlewares/authCommumUser');
const bcrypt = require('bcryptjs');

const Category = require('../models/Category');
const Scale = require('../models/Scale');
const Question = require('../models/Category');
const AnswersOfPeople = require('../models/AnswersOfPeople');
const Answer = require('../models/Answer');
const People = require('../models/People');


async function answerScale(req, res) {
    const { peopleId, scaleId, answers } = req.body;

    try {
        const people = await People.findById(peopleId);
        const scale = await Scale.findById(scaleId);

        const lastAnswerOfPeople = await AnswersOfPeople.findOne({ scale, people });

        if (lastAnswerOfPeople != null) {

            lastAnswerOfPeople.answers.map(async a => {

                await Answer.deleteOne({ '_id': a })

            })
            // await a.deleteOne();
        }


        const answersOfPeople = new AnswersOfPeople();
        answersOfPeople.people = people;
        answersOfPeople.scale = scale;
        const answersP = []
        var respPeople = 0;

        await Promise.all(answers.map(async a => {
            const eachAnswer = new Answer()
            eachAnswer.result = a.result
            eachAnswer.question = a.question
            respPeople = respPeople + a.result;
            await eachAnswer.save()
            answersP.push(eachAnswer);
        }))
        answersOfPeople.answers = answersP;
        answersOfPeople.average = parseFloat(generateAverage(scale, respPeople).toFixed(2));
        await answersOfPeople.save();
        const aops = await AnswersOfPeople.find({ scale });
        const performance = parseFloat(generatePerformance(aops, answersOfPeople.average)).toFixed(2);
        console.log(performance);


        return res.send({ avarege: answersOfPeople.average, performance: performance + '%' });
    } catch (error) {
        console.log(error);
        return res.status(400).send({ error: 'Error answer scale' });
    }
}
function generatePerformance(aops, media) {
    var total = aops.length;//2
    var countPeoples = 0
    aops.map(aop => {
        if (aop.average <= media) {
            countPeoples++;
        }
    });
    console.log(countPeoples);
    console.log(total);

    if (total <= 1)
        return 100;

    return (countPeoples * 100) / total;
}

function generateAverage(scale, respPeople) {
    var respTotal = scale.maxScaleValue * scale.questions.length;
    var media = (respPeople * 10) / respTotal;
    return media;
}

async function getAnswerOfPeople(req, res) {
    const peopleId = req.params.people;
    const scaleId = req.params.scale;
    try {

        const aop = await AnswersOfPeople.findOne({ 'people': peopleId, 'scale': scaleId });
        const aops = await AnswersOfPeople.find({ 'scale': scaleId });
        const performance = parseFloat(generatePerformance(aops));

        return res.send({ aop, performance: performance + '%' });
    } catch (error) {
        return res.status(400).send({ Error: 'Error get answer of people' });
    }


}

async function getScale(req, res) {
    const peopleId = req.params.people;
    const scaleId = req.params.scale;
    var performance = null;
    console.log(peopleId + "AAAAAAAAA" + scaleId);
    try {
        const scale = await Scale.findById({ '_id': scaleId });
        const aop = await AnswersOfPeople.findOne({ 'people': peopleId, 'scale': scaleId }).sort({"cratedAt":-1});
        if (aop != null) {
            const aops = await AnswersOfPeople.find({ 'scale': scaleId });
            performance = parseFloat(generatePerformance(aops, aop.avarege));
        }

        scaleInformation = {
            "title": scale.title,
            "information": scale.informations,
            "avarege": aop ? aop.average : null,
            "performance": performance
        }

        return res.send(scaleInformation);
    } catch (error) {
        console.log(error);
        return res.status(400).send({ Error: 'Error get scale' })
    }

}


async function listScalesUser(req, res) {
    try {
        const scalesUser = [];
        const scales = await Scale.find();

        scales.map(e => {

            scaleUser = {
                "title": e.title,
                "image": e.image,
                "_id": e._id
            }

            scalesUser.push(scaleUser);

        })

        return res.status(200).send({ scalesUser });
    } catch (error) {
        console.log(error);
        return res.status(400).send({ erro: 'Error get scales' });
    }
}

async function listScaleWithQuestions(req, res) {
    const scaleId = req.params.scale
    try {
        const scale = await Scale.findById(scaleId).populate('questions');

        const scaleQuestions = {
            "questions": scale.questions,
            "minLabel": scale.minLabel,
            "maxLabel": scale.maxLabel,
            "minScaleValue": scale.minScaleValue,
            "maxScaleValue": scale.maxScaleValue,
            "title": scale.title
        }


        return res.status(200).send({ scaleQuestions });
    } catch (error) {
        return res.status(400).send({ erro: 'Error get questions' });
    }

}



module.exports = { answerScale, getAnswerOfPeople, listScalesUser, getScale, listScaleWithQuestions };