import React, { Component, useState, useEffect } from 'react'
import { ContainerHeader, DivButtonDeleteFile, DivInputFileDefault, DivNumberItem, DivLabelFormat } from "../../components/Container";
import { FormResponsiveInformationScale, FormDefaultInformations } from '../../components/Form';
import { Row, Col, message, Spin, Modal } from 'antd';
import { ButtonDefault, ButtonDelete } from '../../components/Button';
import { DownloadOutlined, ExceptionOutlined, EditOutlined, PaperClipOutlined, CloseCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { InputDefault, } from '../../components/input';
import { LabelDefault, LabelTitle } from '../../components/Label';
import { CardListDefault } from '../../components/Card';
import informationService from '../../service/InformationScalePeople/InformationScaleAdm'
import { TOKEN } from '../../service/Auth';
import sleep from '../../validate/util';
import { ModalImage } from '../../components/Modal'
import { useSelector } from "react-redux";

const { confirm } = Modal;

export default function InformationScale() {

    const [scale, setScale] = useState();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const userRedux = useSelector(state => state.user);

    useEffect(() => {
        const scaleid = window.location.pathname.split("/")[2];

        informationService.InformationScale(scaleid, userRedux.session.token, (e) => {

            console.log(e);
            setScale(e);
            console.log(scale);

        })

    }, [])


    const divLabel = {
        height: "auto",
    }

    const divHeader = {
        margin: "10px",
    }

    const h1 = {
        float: "initial",
    };

    const divInitial = {
        textAlign: "initial",
        maxWidth: "600px",
    };

    const organizationCol = {
        display: "grid",
        textAlign: "initial",
    };

    const modal = {
        height: "200px",
    }


    const deleteScale = async () => {
        confirm({
            title: 'Realmente deseja remover essa escala?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Sim',
            okType: 'danger',
            cancelText: 'Não',
            onOk() {
                const scaleid = window.location.pathname.split("/")[2];
                informationService.DeleteScale(scaleid, userRedux.session.token, async (e) => {
                    message.success("Deletado");
                    await sleep(500);
                    window.location = "/";
                })
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }



    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const renderCardItem = (card, index) => {
        return (
            <div>
                <DivButtonDeleteFile>

                    <DivNumberItem width="35px" maxWidth="35px">
                        <LabelTitle margin={" 0px 12px 0px 0px"}>{index + 1}</LabelTitle>
                    </DivNumberItem>

                    <DivLabelFormat maxWidth="605px" >
                        <LabelDefault>{card.title}</LabelDefault>
                    </DivLabelFormat>
                </DivButtonDeleteFile>
            </div>
        )
    }

    return scale ? (
        <ContainerHeader>
            <ModalImage
                title="Imagem"
                visible={isModalVisible}
                centered
                okButtonProps={{ ghost: true }}
                onCancel={handleCancel}
                footer={null}
            >
                <img src={"http://localhost:81/back/api/" + scale.image} height="150px" />
            </ModalImage>
            <FormResponsiveInformationScale>
                <Row>
                    <Col span={24}>
                        <div>
                            <h1 style={h1}>Informações</h1>
                        </div>
                        <div id="btt_div_normal" style={divHeader}>
                            <ButtonDefault href={"/edit_scale/" + window.location.pathname.split("/")[2]} margin="0 10px 0 0" icon={<EditOutlined />}>
                                Editar
                            </ButtonDefault>
                            <ButtonDefault href={"http://localhost:81/back/api/collector/scale/" + window.location.pathname.split("/")[2]} icon={<DownloadOutlined />}>
                                Download CSV
                            </ButtonDefault>
                            <ButtonDefault href={"/questions/" + window.location.pathname.split("/")[2]} margin="0 0 0 10px" icon={<ExceptionOutlined />}>
                                Teste escala
                            </ButtonDefault>
                            <ButtonDelete  onClick={deleteScale} background="#ca2828" margin="0 0 0 10px" icon={<CloseCircleOutlined />}>
                                Deletar
                            </ButtonDelete>
                        </div>
                        <div id="btt_div_responsive" style={divHeader}>
                            <ButtonDefault href={"/edit_scale/" + window.location.pathname.split("/")[2]} margin="0 10px 0 0" icon={<EditOutlined />}/>
                            <ButtonDefault href={"http://localhost:81/back/api/collector/scale/" + window.location.pathname.split("/")[2]} icon={<DownloadOutlined />}/>
                            <ButtonDefault href={"/questions/" + window.location.pathname.split("/")[2]} margin="0 0 0 10px" icon={<ExceptionOutlined />}/>
                            <ButtonDelete  onClick={deleteScale} background="#ca2828" margin="0 0 0 10px" icon={<CloseCircleOutlined />}/>
                        </div>
                    </Col>
                </Row>
                <FormDefaultInformations>
                    <Row>
                        <Col span={24}>
                            <div>
                                <LabelTitle className="f-left">Título:</LabelTitle >
                            </div>
                        </Col>
                        <Col span={24}>
                            <div>
                                <DivLabelFormat>
                                    <LabelDefault>{scale.title}</LabelDefault>
                                </DivLabelFormat>
                            </div>
                        </Col>
                        <Col span={24}>
                            <div>
                                <LabelTitle className="f-left">Informações:</LabelTitle >
                            </div>
                        </Col>
                        <Col span={24}>
                            <div>
                                <DivLabelFormat minHeight="150px">
                                    <LabelDefault>{scale.informations}</LabelDefault>
                                </DivLabelFormat>
                            </div>
                        </Col>
                        <Col span={12} style={organizationCol}>
                            <div>
                                <LabelTitle className="f-left">Valores da escala:</LabelTitle >
                            </div>
                            <div >
                                <DivLabelFormat maxWidth="100px" padding="2px 2px 2px 32px">
                                    <LabelDefault textAlign="center">{scale.minScaleValue} à {scale.maxScaleValue}</LabelDefault>
                                </DivLabelFormat>
                            </div>
                        </Col>
                        <Col span={12} style={organizationCol}>
                            <div>
                                <LabelTitle className="f-left">Imagem:</LabelTitle >
                            </div>
                            <DivButtonDeleteFile margin="none">
                                <DivInputFileDefault>
                                    <PaperClipOutlined />
                                    <LabelDefault id="labelInputFile1" onClick={showModal}>{scale.imageName}</LabelDefault>
                                </DivInputFileDefault>
                            </DivButtonDeleteFile>
                        </Col>
                        <Col span={24}>
                            <div>
                                <LabelTitle className="f-left">Labels dos Valores:</LabelTitle >
                            </div>
                        </Col>
                        <Col span={24}>
                            <div style={divInitial}>
                                <DivLabelFormat maxWidth="310px">
                                    <LabelDefault>{scale.minLabel}</LabelDefault>
                                </DivLabelFormat>
                                <DivLabelFormat maxWidth="310px">
                                    <LabelDefault>{scale.maxLabel}</LabelDefault>
                                </DivLabelFormat>
                            </div>
                        </Col>
                        <Col span={24}>

                        </Col>
                        <Col span={24}>
                            <div>
                                <LabelTitle className="f-left">Perguntas:</LabelTitle >
                            </div>
                        </Col>
                        <Col span={24}>
                            <div>

                                {scale.questions.map(renderCardItem)}

                            </div>
                        </Col>

                    </Row>
                </FormDefaultInformations>
            </FormResponsiveInformationScale>

        </ContainerHeader>
    ) : (<Spin />);
}