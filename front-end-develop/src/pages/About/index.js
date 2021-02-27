import React, { Component } from 'react';
import { Container } from '../../components/Container';
import { LabelDefault } from '../../components/Label';
import { CardDefault } from '../../components/Card';
import { Row, Col } from 'antd';
import Logo from '../../assets/images/logo512.png';

const img = {
    width: 200,
    height: 200
}

const div = {
    margin: 10
}

const h1Style = {
    fontSize: "40px",
    marginTop: "20%",
    color: "#001529",
}

export default function About() {
    return (
        <Container>
            <Row>
                <Col span={24}>
                <h1 style={h1Style}>Ent Project</h1>
                </Col>
                <Col span={24}>
                    <div>
                        <LabelDefault>Sobre:</LabelDefault>
                        <CardDefault>
                            <LabelDefault>ENT PROJECT é um projeto que busca coletar e diagnosticar o perfil empreendedor dos indivíduos. Decisões de desenvolvimento pessoal, educacionais e de políticas públicas podem ser tomadas a partir dessas informações. </LabelDefault>
                        </CardDefault>
                    </div>
                </Col>
                <Col span={24}/>
                <Col span={12}>
                    <div style={div}>
                        <LabelDefault>Professores:</LabelDefault>
                        <CardDefault>
                            <LabelDefault>Milton</LabelDefault>
                        </CardDefault>
                    </div>
                </Col>
                <Col span={12}>
                    <div style={div}>
                        <LabelDefault>Alunos:</LabelDefault>
                        <CardDefault>
                            <LabelDefault>Jonathan</LabelDefault>
                        </CardDefault>
                    </div>
                </Col>
                
            </Row>

        </Container>
    );
}
