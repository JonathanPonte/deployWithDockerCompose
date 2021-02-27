import React, { useState, useEffect } from 'react'
import { ContainerHeader, DivLabelQuestion, DivNumberQuestion } from '../../components/Container';
import { LabelDefault } from '../../components/Label';
import { ButtonDefault } from '../../components/Button';
import { Row, Col } from 'antd';
import { FormDefault } from '../../components/Form';
import { Radio } from 'antd';
import { CardDefault } from '../../components/Card'
import { useSelector } from "react-redux";
import QuestionService from '../../service/Questions/QuestionService'
import AnswersService from '../../service/Questions/AnswersService'
import { Spin, message } from 'antd';
import { isAuthenticatedAdm, isAuthenticatedPeople} from "../../service/Auth";

const button = {
    marginTop: "30px"
};

const divAnswer = {
    marginBottom: "20px",
};

const textLabel = {
    fontWeight: "bold",
}


export default function Question() {

    const userRedux = useSelector(state => state.user);
    const [scaleQuestions, setScaleQuestions] = useState();
    let answers = [];
    var answerScale = {
        "peopleId": (userRedux.session.people ? userRedux.session.people._id : undefined),
        "scaleId": window.location.pathname.split("/")[2],
        "answers": answers
    }

    useEffect(() => {
        const scaleid = window.location.pathname.split("/")[2];

        QuestionService.ScaleWithQuestion(scaleid, userRedux.session.token, (e) => {
            setScaleQuestions(e);

        })

    }, [])

    const handleChange = (e, questionId) => {

        createAnswers(questionId, e.target.value)

    }

    function createAnswers(questionId, value) {

        const answer = {
            "result": value,
            "question": questionId
        }

        const result = answers.find(answerItem => answerItem.question == answer.question)

        if (result === undefined) {
            answers.push(answer);
        } else {
            const index = answers.indexOf(result);
            answers.splice(index, 1);
            answers.push(answer);
        }
    }

    const handleClick = () => {

        if (answers.length != scaleQuestions.questions.length) {
            message.warning("Todos as questões devem ser respondidas");
        } else {
            AnswersService.Answers(answerScale, userRedux.session.token, (e) => {

                window.location.href = "/scale/" + answerScale.scaleId;

            })
        }

    }

    const renderCardItem = (question, index) => {
        let rows = [];
        for (let i = scaleQuestions.minScaleValue; i <= scaleQuestions.maxScaleValue; i++) {
            rows.push(i);
        }

        return (
            <CardDefault style={divAnswer} key={index}>
                <div>
                    <DivNumberQuestion className="f-left">
                        <LabelDefault>{index + 1})</LabelDefault>
                    </DivNumberQuestion>
                    <DivLabelQuestion>
                        <LabelDefault>{question.title}</LabelDefault>
                    </DivLabelQuestion>
                </div>
                <div style={divAnswer}>
                    <LabelDefault margin="0 10px 0 0" style={textLabel}>{scaleQuestions.minLabel}</LabelDefault>
                    <Radio.Group>
                        {rows.map(function (number) {
                            return <Radio value={number} onChange={e => handleChange(e, question._id)} >{number}</Radio>
                        })}
                    </Radio.Group>
                    <LabelDefault style={textLabel}>{scaleQuestions.maxLabel}</LabelDefault>
                </div>
            </CardDefault>
        )
    }

    return scaleQuestions ? (
        <ContainerHeader>
            <FormDefault>
                <Row >
                    <Col span={24}>
                        <h1>{scaleQuestions.title}</h1>
                    </Col>
                    <Col span={24}>
                        {scaleQuestions.questions.map(renderCardItem)}
                    </Col>
                    <Col span={24}>
                        <div>
                           {userRedux.session.people ? <ButtonDefault style={button} onClick={handleClick}>Finalizar</ButtonDefault>
                            : <ButtonDefault style={button} href={"/scale/" + answerScale.scaleId} >Voltar</ButtonDefault>}
                        </div>
                    </Col>
                </Row>

            </FormDefault>
        </ContainerHeader>
    ) : (
            <ContainerHeader>
                <Spin />
            </ContainerHeader>
        );

}

