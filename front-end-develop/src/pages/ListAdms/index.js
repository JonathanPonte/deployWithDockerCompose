import React, { Component, useReducer, useState, useEffect } from 'react'
import { ContainerResponsiveListAdm, DivButtonDeleteFile, DivLabelFormat } from '../../components/Container';
import { LabelTitle } from '../../components/Label';
import { Row, Col, Modal, message} from 'antd';
import { SearchOutlined, PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { InputSearch   } from '../../components/input';
import { ButtonDefault } from '../../components/Button';
import { DeleteOutlined } from "@ant-design/icons";
import api from "../../service/Api";
import { useSelector } from "react-redux";
import AdmService from "../../service/Adm/AdmService"
import Operation from 'antd/lib/transfer/operation';

const { confirm } = Modal;

const divName = {
    width: "20%",
}

const divTrash = {
    width: "80%",
}

const divLabelFormat = {
    margin: "10px"
}








export default function ListAdms() {

    const userRedux = useSelector(state => state.user);
    const [search, setSearch] = useState("");
    const [cardAdms, setCardAdms] = useState("");
    const [listCardDynamic, setlistCardDynamic] = useState("");


    useEffect(() => {
        AdmService.getAdmins(userRedux.session.token, (e) => {
         setCardAdms(e);
         setlistCardDynamic(e);
        }) 
    }, [])

    const divCard = {
        marginTop: "20px",
    }

    const handleDelete = (id) => {
        console.log(id);
        confirm({
            title: 'Realmente deseja remover esse administrador?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Sim',
            okType: 'danger',
            cancelText: 'Não',
            onOk() {
               AdmService.deleteAdm(id, userRedux.session.token, () => {
                message.success("Removido");  
                window.location.reload();
               })
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    const handleChange = e => {
        setSearch(e.target.value);
      
        setlistCardDynamic(cardAdms.filter( card => card.name.toLowerCase().includes(e.target.value.toLowerCase())));  
    }

    const renderCard = (card, index) => {
        return (
            <DivLabelFormat style={divLabelFormat} key={index}>
                <div style={divTrash} >
                    <LabelTitle className="f-left" marginBottom="none">{card.name}</LabelTitle><br/>
                </div>
                <div style={divTrash}>
                    <DivButtonDeleteFile className="f-right" margin="10px" >
                        <DeleteOutlined  className="deleteButton" onClick={() => handleDelete(card._id)}/>
                    </DivButtonDeleteFile>
                </div>
            </DivLabelFormat>
        )
    }

    return listCardDynamic ? (
        <ContainerResponsiveListAdm margin="0 100px 0 100px">
            <Row>
                <Col span={24}>
                    <div>
                        <InputSearch
                            prefix={<SearchOutlined className="icon-style" />}
                            minWidth="200px"
                            maxWidth="400px"
                            float="left"
                            placeholder="Nome do Administrador"
                            value={search}
                            onChange={e => handleChange(e)} />
                        <ButtonDefault id="btt_normal" href="/new_adm" float="right" icon={<PlusOutlined />}>
                            Nova Adm
                        </ButtonDefault>
                        <ButtonDefault id="btt_responsive" href="/new_adm" float="right" icon={<PlusOutlined />}/>
                    </div>
                </Col>
                <Col span={24}>
                    <div style={divCard}>
                        {listCardDynamic.map(renderCard)}    
                    </div>
                </Col>
            </Row>
        </ContainerResponsiveListAdm>
    ) : (
        <div>Loading...</div>
    );
}