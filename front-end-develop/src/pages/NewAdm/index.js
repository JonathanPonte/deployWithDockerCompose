import React, { useState } from 'react'
import { ContainerHeader } from '../../components/Container';
import { InputDefault } from '../../components/input';
import { LabelTitle } from '../../components/Label';
import { ButtonDefault } from '../../components/Button';
import { Row, Col, message } from 'antd';
import { FormResponsiveNewAdm } from '../../components/Form';
import { useSelector } from "react-redux";
import { validateFormLogin } from '../../validate/validateLogin'
import api from '../../service/Api';


const button = {
    marginTop: "30px"
};


export default function NewAdm() {

    const userRedux = useSelector(state => state.user);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPessword] = useState("");
    const [confirmationPassword, setConfirmationPassword] = useState("");

    const handleFinish = async e => {

        if (validateFormLogin(email, password) && password === confirmationPassword) {

            const adm = {
                name: name,
                user: {
                    email: email,
                    password: password
                }
            }

            await api.post("/adm", adm, {
                headers: {
                    authorization: 'Bearer ' + userRedux.session.token
                }
            }).then(response => {

                if(response.status === 201){
                    message.success("Adm criado com sucesso!");
                }

            }).catch(e => {
               
                if(e.response.status == 403){
                    message.warning("Email já registrado");
                }

            });

        } else {
            message.warning("Todos os campos devem ser preenchidos e a senha deve possuir mais de 6 digitos");
        }


    }

    const handleChange = e => {

        switch (e.target.name) {
            case "name":
                setName(e.target.value);
                break;
            case "email":
                setEmail(e.target.value);
                break;
            case "password":
                setPessword(e.target.value);
                break;
            case "confimationPassword":
                setConfirmationPassword(e.target.value);
                break;
        }

    }

    return (
        <ContainerHeader>
            <FormResponsiveNewAdm onFinish={e => handleFinish(e)}>
                <Row >
                    <Col span={24}>
                        <h1>Novo Administrador</h1>
                        <div>
                            <LabelTitle className="f-left">Nome:</LabelTitle>
                            <InputDefault
                                placeholder="Insira seu nome"
                                name="name"
                                type="text"
                                value={name}
                                onChange={e => handleChange(e)}
                                required />
                        </div>
                    </Col>
                    <Col span={24}>
                        <div>
                            <LabelTitle className="f-left">Email:</LabelTitle >
                            <InputDefault
                                placeholder="Insira seu email"
                                name="email"
                                type="text"
                                value={email}
                                onChange={e => handleChange(e)}
                                required />
                        </div>
                    </Col>
                    <Col span={24}>
                        <div>
                            <LabelTitle className="f-left">Senha:</LabelTitle >
                            <InputDefault
                                placeholder="Insira sua senha"
                                name="password"
                                type="password"
                                value={password}
                                onChange={e => handleChange(e)}
                                required />
                        </div>
                    </Col>
                    <Col span={24}>
                        <div>
                            <LabelTitle className="f-left">Confirmação de senha:</LabelTitle >
                            <InputDefault
                                placeholder="Insira sua senha novamente"
                                name="confimationPassword"
                                type="password"
                                value={confirmationPassword}
                                onChange={e => handleChange(e)}
                                required />
                        </div>
                    </Col>
                    <Col span={24}>
                        <div>
                            <ButtonDefault style={button} htmlType="submit">Cadastrar</ButtonDefault>
                        </div>
                    </Col>
                </Row>

            </FormResponsiveNewAdm>
        </ContainerHeader>
    );

}

