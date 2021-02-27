import React, { Component, useReducer, useState } from 'react'
import { Container, ContainerHeader } from '../../components/Container';
import { InputDefault } from '../../components/input';
import { LabelTitle } from '../../components/Label';
import { ButtonDefault } from '../../components/Button';
import { DatePickerDefault } from '../../components/DatePickerDefault';
import { Row, Col, message } from 'antd';
import { FormResponsiveChangePassword } from '../../components/Form';
import { useSelector } from "react-redux";
import { isAuthenticatedPeople, isAuthenticatedAdm } from "../../service/Auth";
import api from "../../service/Api";

const button = {
    marginTop: "30px"
};


export default function ChangePassword() {

    const userRedux = useSelector(state => state.user);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confimationNewPassword, setConfirmationNewPassword] = useState("");
    var id;
    var email;

    function checkUser() {
        if (isAuthenticatedAdm) {
            id = userRedux.session.adm.user._id
            email = userRedux.session.adm.user.email
        }

        if (isAuthenticatedPeople) {
            id = userRedux.session.adm.user._id
            email = userRedux.session.adm.user.email
        }

    }

    const handleChange = e => {
        switch (e.target.name) {
            case "oldPassword":
                setOldPassword(e.target.value);
                break;
            case "newPassword":
                setNewPassword(e.target.value);
                break;
            case "confimationNewPassword":
                setConfirmationNewPassword(e.target.value);
                break;

        }
    }

    const handleFinish = async e => {

        if (oldPassword.length < 6 || newPassword.length < 6 || confimationNewPassword.length < 6) {
            message.warning("Senha invalida");
        } else {

            if (newPassword !== confimationNewPassword) {
                message.warning("As senhas devem ser iguais");
            } else {
                checkUser();
                const user = {
                    id: id,
                    email: email,
                    currentPassword: oldPassword,
                    newPassword: newPassword,
                    confirmationPassword: confimationNewPassword
                }

                await api.put("/adm/change_password", user, {
                     headers: {
                        authorization: 'Bearer ' + userRedux.session.token
                    }

                }).then(response => {

                   if(response.status == 200){
                    message.success("Senha modificada com sucesso!");
                    window.location.href = "/";
                   }
    
                    
                }).catch(e => {

                    if(e.response.status) {
                        message.warning("Certifique-se de preencher todos os campos corretamente");
                    }

                });

            }
        }

    }

    return (
        <ContainerHeader>
            <FormResponsiveChangePassword onFinish={e => handleFinish(e)}>
                <Row >
                    <Col span={24}>
                        <h1>Novo Senha</h1>
                        <div>
                            <LabelTitle className="f-left">Senha Atual:</LabelTitle >
                            <InputDefault
                                placeholder="Insira seu senha"
                                type="password"
                                name="oldPassword"
                                value={oldPassword}
                                onChange={e => handleChange(e)}
                                required />
                        </div>
                    </Col>
                    <Col span={24}>
                        <div>
                            <LabelTitle className="f-left">Senha:</LabelTitle >
                            <InputDefault
                                placeholder="Insira sua senha"
                                type="password"
                                name="newPassword"
                                value={newPassword}
                                onChange={e => handleChange(e)}
                                required />
                        </div>
                    </Col>
                    <Col span={24}>
                        <div>
                            <LabelTitle className="f-left">Confirmação de senha:</LabelTitle >
                            <InputDefault
                                placeholder="Insira sua nova senha novamente"
                                type="password"
                                name="confimationNewPassword"
                                value={confimationNewPassword}
                                onChange={e => handleChange(e)}
                                required />
                        </div>
                    </Col>
                    <Col span={24}>
                        <div>
                            <ButtonDefault style={button} htmlType="submit">Salvar</ButtonDefault>
                        </div>
                    </Col>
                </Row>
            </FormResponsiveChangePassword>
        </ContainerHeader>
    );

}

