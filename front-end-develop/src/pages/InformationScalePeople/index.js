import React, { useState, useEffect } from 'react'
import { ContainerHeader, DivLabelFormat } from "../../components/Container";
import { FormInformationScale, FormDefaultInformations, FormResponsiveInformationScaleUser } from '../../components/Form';
import { Row, Col } from 'antd';
import { ButtonDefault } from '../../components/Button';
import { ExceptionOutlined } from '@ant-design/icons';
import { LabelDefault, LabelTitle } from '../../components/Label';
import InformationScalePeopleService from '../../service/InformationScalePeople/InformationScalePeopleService'
import { useSelector } from "react-redux";

export default function InformationScalePeople() {

    const [title, setTitle] = useState();
    const [information, setInformations] = useState();
    const [avarege, setAvarege] = useState();
    const [performance, setPerformance] = useState()
    const userRedux = useSelector(state => state.user);

    useEffect(() => {
        const scaleid = window.location.pathname.split("/")[2];

        InformationScalePeopleService.InformationScalePeople(scaleid, userRedux.session.people._id, userRedux.session.token, (scale) => {
            console.log(scale);
            setTitle(scale.title);
            setInformations(scale.information);
            setAvarege(scale.avarege);
            setPerformance(scale.performance);
        });
    }, [])

    const organizationCol = {
        display: "grid",
        textAlign: "initial",
    };

    const divHeader = {
        margin: "10px",
    }

    const h1 = {
        float: "initial",
    };


    return (
        <ContainerHeader>
            <FormResponsiveInformationScaleUser>
                <Row>
                    <Col span={24}>
                        <div>
                            <h1 style={h1}>Escala</h1>
                        </div>
                    </Col>
                </Row>
                <FormDefaultInformations>
                    <Row>
                        <Col span={20} style={organizationCol}>
                            <div>
                                <LabelTitle className="f-left">Título:</LabelTitle>
                            </div>
                            <div>
                                <DivLabelFormat>
                                    <LabelDefault>{title}</LabelDefault>
                                </DivLabelFormat>
                            </div>
                        </Col>
                        <Col span={4} style={organizationCol}>
                            <div>
                                <LabelTitle className="f-left">Nota:</LabelTitle>
                            </div>
                            {avarege ?
                            (
                                <div>
                                    <DivLabelFormat id="div_avarege" padding="0000" display='flow-root' >
                                        <LabelDefault>{avarege}</LabelDefault>
                                    </DivLabelFormat>
                                </div>
                            ) : (
                                <div>
                                    <DivLabelFormat id="div_avarege" padding="0000" display='flow-root' >
                                        <LabelDefault>-</LabelDefault>
                                    </DivLabelFormat>
                                </div>
                            )}
                        </Col>
                        <Col span={24}>
                            <div>
                                <LabelTitle className="f-left">Informações:</LabelTitle>
                            </div>
                        </Col>
                        <Col span={24}>
                            <div>
                                <DivLabelFormat minHeight="150px">
                                    <LabelDefault>{information}</LabelDefault>
                                </DivLabelFormat>
                            </div>
                        </Col>
                        <Col span={24}>
                            <div style={divHeader}>
                                <ButtonDefault href={"/questions/" + window.location.pathname.split("/")[2]} margin="0 0 0 10px" icon={<ExceptionOutlined />}>
                                    Teste escala
                            </ButtonDefault>
                            </div>
                        </Col>
                    </Row>
                </FormDefaultInformations>
            </FormResponsiveInformationScaleUser>

        </ContainerHeader>
    );
}