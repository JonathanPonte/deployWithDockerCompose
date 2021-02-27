import React, { useState, useEffect } from 'react'
import { DivButtonDeleteFile, DivInputFileDefault, DivInputFileNewScale, ContainerHeader, DivNumberItem } from '../../components/Container';
import { InputDefault, TextArea } from '../../components/input';
import { LabelDefault, LabelTitle } from '../../components/Label';
import { ButtonDefault, ButtonLogin } from '../../components/Button';
import { FormResponsiveNewScale, FormResponsiveAddQuestion } from '../../components/Form';
import { Row, Col, message, Modal } from 'antd';
import { PaperClipOutlined, DeleteOutlined, EyeOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import $ from "jquery";
import NewScaleServie from '../../service/NewScale/NewScaleService';
import { TOKEN } from '../../service/Auth';
import sleep from '../../validate/util'
import informationService from '../../service/InformationScalePeople/InformationScaleAdm'
import EditScale from '../../service/InformationScalePeople/EditScale'
import { useSelector } from "react-redux";
import { ModalImage, ModalDefault } from '../../components/Modal'
import { PlusOutlined } from '@ant-design/icons';

const { confirm } = Modal

const button = {
    marginTop: "30px"
};

const organizationCol = {
    display: "grid",
    textAlign: "initial",
};

const divInitial = {
    textAlign: "initial",
    maxWidth: "600px",
};

const divValMaxMin = {
    display: "flex",
};

const uploadImage = (e) => {
    console.log(e.target);
}


const divHeader = {
    margin: "10px",
}

const div = {
    margin: "30px 0px 0px 0px"
}

const cardDelete = {

}

export default function NewScale() {

    const [title, setTitle] = useState();
    const [informations, setInformations] = useState();
    const [valueMin, setValueMin] = useState();
    const [valueMax, setValueMax] = useState();
    const [valueLabelMax, setLabelMax] = useState();
    const [valueLabelMin, setLabelMin] = useState();
    const [base64, setBase64] = useState();
    const [imageUrl, setImageUrl] = useState();
    const [imageName, setImageName] = useState();
    const [question, setQuestion] = useState();
    const [questions, setQuestions] = useState([]);
    const [see, setSee] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isConfirm, setIsConfirm] = useState(false);
    const userRedux = useSelector(state => state.user);

    useEffect(() => {
        const scaleid = window.location.pathname.split("/")[2];

        informationService.InformationScale(scaleid, userRedux.session.token, (e) => {
            console.log(e);
            setTitle(e.title)
            setInformations(e.informations)
            setValueMin(e.minScaleValue)
            setValueMax(e.maxScaleValue)
            setLabelMax(e.maxLabel)
            setLabelMin(e.minLabel)
            setImageUrl("http://localhost:81/back/api/" + e.image)
            setQuestions(e.questions)
            setImageName(e.imageName);
        })

    }, [])

    const handleSendFile = (e, fileName) => {
        if (fileName === "file1") {
            $("#inputFile1").click();
            $("#inputFile1").change(() => {
                if ($("#labelInputFile1").text($("#inputFile1")[0].files[0].name) !== undefined) {
                    $("#labelInputFile1").text($("#inputFile1")[0].files[0].name);
                    $("imgTag").show($("#inputFile1")[0].files[0])
                    const img = $("#inputFile1")[0].files[0];
                    var imagem = new Image();
                    var reader = new FileReader();
                    reader.readAsDataURL(img);
                    reader.onload = function () {

                        setBase64(reader.result)
                        setImageUrl(reader.result)
                        setImageName(img.name);
                        // imagem.src = reader.result;
                        // checar tamanho da imagem
                        // imagem.onload = function () {

                        // }

                    };


                }
            });
        }
    };


    const handleDeleteFile = () => {
        if (document.getElementById("labelInputFile1") !== null) {
            document.getElementById("labelInputFile1").value = "";
            $("#labelInputFile1").text("");
        } else {
            message.warning("Sem imagem");
        }
    };

    const handleChange = (e) => {

        switch (e.target.name) {

            case "title": {
                setTitle(e.target.value);
                break
            }

            case "informations": {
                setInformations(e.target.value);
                break
            }

            case "valueMax": {
                setValueMax(e.target.value);
                break
            }

            case "valueMin": {
                setValueMin(e.target.value);
                break
            }

            case "valueLabelMax": {
                setLabelMax(e.target.value);
                break
            }

            case "valueLabelMin": {
                setLabelMin(e.target.value);
                break
            }

            case "question": {
                setQuestion(e.target.value);
                console.log(question);
                break
            }

        }



    }


    const handleSubmit = () => {
        const id = window.location.pathname.split("/")[2];

        const scale = {
            "_id": id,
            "title": title,
            "informations": informations,
            "minLabel": valueLabelMin,
            "maxLabel": valueLabelMax,
            "minScaleValue": valueMin,
            "maxScaleValue": valueMax,
            "questions": questions,
            "image": imageUrl,
            "imageName": imageName,
            "extension": ".jpg"
        }

        console.log(scale);

        if (questions.length > 0) {
            if (imageUrl != undefined) {
                if (valueMin < valueMax) {
                    EditScale.EditScale(scale, userRedux.session.token, async (e) => {

                        console.log(e);
                        message.success("Criado com sucesso!");
                        await sleep(500);
                        window.location = "/"
                    })

                } else {
                    message.warning("Valores invalidos");
                }
            } else {
                message.warning("Adicione a imagem");
            }
        } else {
            message.warning("Questionario sem questões");
        }

    }



    const handleClick = () => {
        questions.push(question)
        console.log(questions);
    }


    function addNewScale() {
        if(question){
            message.warning(question)
            const scaleCopy = Array.from(questions);
            scaleCopy.push({ title: question })
            setQuestions(scaleCopy);
            setQuestion("");    
        }else{
            message.warning("Insira um enunciado para questão")
        }
    }

    const deleteQuestion = (index) => {
        const questionsCopy = Array.from(questions);
        questionsCopy.splice(index, 1);
        setQuestions(questionsCopy);
    }

    const updateQuestion = ({ target }, index) => {
        const questionsCopy = Array.from(questions);
        questionsCopy.splice(index, 1, { title: target.value });
        setQuestions(questionsCopy);
    }

    const renderCardItem = (card, index) => {
        console.log(questions);
        return (
            <div style={divHeader} key={index}>

                <DivButtonDeleteFile>
                    <DivNumberItem className="f-left">
                        <LabelDefault>{index + 1}</LabelDefault>
                    </DivNumberItem>
                    <TextArea
                        maxWidth="605px"
                        value={card.title}
                        autoSize={{ minRows: 1, maxRows: 5 }}
                        onChange={(event) => updateQuestion(event, index)}></TextArea>

                    <DeleteOutlined className="deleteButton" onClick={() => deleteQuestion(index)} />
                </DivButtonDeleteFile>
            </div>
        )
    }

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const showModalConfirm = () => {
        setIsConfirm(true);
    };

    const handleCancelConfirm = () => {
        setIsConfirm(false);
    };


    const handleSave = () => {
        confirm({
            title: 'Realmente deseja salvar as modificações?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Sim',
            okType: 'danger',
            cancelText: 'Não',
            onOk() {
                
                handleSubmit();

            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    return (

        <ContainerHeader>
            <ModalDefault
                title="Confirmação"
                visible={isConfirm}
                centered
                icon={<ExclamationCircleOutlined />}
                okButtonProps={{ ghost: true }}
                onCancel={handleCancelConfirm}
                footer={<ButtonLogin type="primary" onClick={handleSubmit}> 
                    Enviar
                 </ButtonLogin>}
            >
                <LabelTitle>modificar a escala pode gerar inconsistencia</LabelTitle>
            </ModalDefault>
            <ModalImage
                title="Imagem"
                visible={isModalVisible}
                centered
                okButtonProps={{ ghost: true }}
                onCancel={handleCancel}
                footer={null}
            >
                <img src={imageUrl} height="150px" />
            </ModalImage>
            <FormResponsiveNewScale onFinish={handleSubmit}>
                <Row >
                    <Col span={24}>
                        <h1>Editar Escala</h1>
                        <div>
                            <LabelTitle className="f-left">Título:</LabelTitle >
                            <InputDefault required onChange={e => handleChange(e)} name="title" value={title} placeholder="Insira o título da escala" />
                        </div>
                    </Col>
                    <Col span={24}>
                        <div>
                            <LabelTitle className="f-left">Informações:</LabelTitle >
                            <TextArea required onChange={e => handleChange(e)} autoSize={{ minRows: 5, maxRows: 5 }} name="informations" value={informations} placeholder="Informações sobre a escala"></TextArea>
                        </div>
                    </Col>
                    <Col span={12} style={organizationCol}>
                        <div>
                            <LabelTitle className="f-left">Labels dos Valores:</LabelTitle >
                        </div>
                        <div style={divInitial}>
                            <InputDefault id="input_label_max" required onChange={e => handleChange(e)} value={valueLabelMax} name="valueLabelMax" placeholder="Label máximo" maxWidth="310px" />
                            <InputDefault id="input_label_min" required onChange={e => handleChange(e)} value={valueLabelMin} name="valueLabelMin" placeholder="Label minimo" maxWidth="310px" margin="10px 0 0 0" />
                        </div>
                    </Col>
                    <Col span={12} style={organizationCol}>
                        <div>
                            <LabelTitle className="f-left">Valores da escala:</LabelTitle >
                        </div>
                        <div style={divValMaxMin}>
                            <InputDefault id="input_value_min" required type="number" min="1" onChange={e => handleChange(e)} value={valueMin} name="valueMin" placeholder="Valor minimo" maxWidth="150px" margin="0px 10px 0px 0px" />
                        </div>
                        <div style={divValMaxMin}>
                            <InputDefault id="input_value_max" required type="number" min="1" onChange={e => handleChange(e)} value={valueMax} name="valueMax" placeholder="Valor máximo" maxWidth="150px" margin="10px 0px 0px 0px" />
                        </div>
                    </Col>

                    <Col id="col_img_responsive" span={12} >
                        <div>
                            <LabelTitle className="f-left">Imagem:</LabelTitle >
                        </div>
                        <DivButtonDeleteFile className="f-left">
                            <DivInputFileNewScale onClick={(e) => handleSendFile(e, "file1")}>
                                <PaperClipOutlined />
                                <InputDefault id="inputFile1" type="file" />
                                <LabelDefault id="labelInputFile1">{imageName}</LabelDefault>
                            </DivInputFileNewScale>
                            <EyeOutlined onClick={showModal} className="deleteButton" />
                            <DeleteOutlined onClick={handleDeleteFile} className="deleteButton" />
                        </DivButtonDeleteFile>
                    </Col>

                    <Col span={12} style={organizationCol}>
                        <div>
                            <LabelTitle className="f-left">Perguntas:</LabelTitle >
                        </div>
                        <div style={divInitial}>
                            <FormResponsiveAddQuestion onSubmit={addNewScale}>
                                <InputDefault id="btt_add_question" required value={question} onChange={e => handleChange(e)} name="question" placeholder="Insira uma pergunta" maxWidth="310px" margin="0 10px 0 0" />
                                <ButtonDefault onClick={addNewScale} icon={<PlusOutlined />} />
                            </FormResponsiveAddQuestion>
                        </div>
                    </Col>
                    
                    <Col id="col_img_normal" span={12} >
                        <div>
                            <LabelTitle className="f-left">Imagem:</LabelTitle >
                        </div>
                        <DivButtonDeleteFile className="f-left">
                            <DivInputFileNewScale onClick={(e) => handleSendFile(e, "file1")}>
                                <PaperClipOutlined />
                                <InputDefault id="inputFile1" type="file" />
                                <LabelDefault id="labelInputFile1">{imageName}</LabelDefault>
                            </DivInputFileNewScale>
                            <EyeOutlined onClick={showModal} className="deleteButton" />
                            <DeleteOutlined onClick={handleDeleteFile} className="deleteButton" />
                        </DivButtonDeleteFile>
                    </Col>

                    <Col span={24}>
                        <div style={div}>
                            {questions.length > 0 ? questions.map(renderCardItem) : (<label>Sem questões</label>)}
                        </div>
                    </Col>
                    <Col span={24}>
                        <div>
                            <ButtonDefault style={button} onClick={handleSave} >Salvar</ButtonDefault>
                        </div>
                    </Col>
                </Row>

            </FormResponsiveNewScale>
        </ContainerHeader>
    );
}