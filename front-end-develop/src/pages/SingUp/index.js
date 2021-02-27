import React, { Component, useState } from 'react'
import { withRouter } from 'react-router';
import { Container, ContainerHeader } from '../../components/Container';
import { InputDefault } from '../../components/input';
import { LabelDefault, LabelTitle } from '../../components/Label';
import { ButtonDefault } from '../../components/Button';
import { DatePickerDefault } from '../../components/DatePickerDefault';
import { FormDefault, FormResponsiveSingUp } from '../../components/Form';
import { SelectDefault, OptionDefault } from '../../components/Select';
import { Row, Col, message } from 'antd';
import service from '../../service/SingUp/SingUpService';
import { validateFormLogin } from "../../validate/validateLogin";


const organizationCol = {
    display: "grid",
    textAlign: "initial",
};

const button = {
    marginTop: "30px"
};

const select = {
    borderRadius: "20px",
    border: "1px solid #000"
};

function onChange(value) {
    console.log(`selected ${value}`);
}

function onBlur() {
    console.log('blur');
}

function onFocus() {
    console.log('focus');
}

function onSearch(val) {
    console.log('search:', val);
}



export default function SingUp() {


    const [name, setName] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [academicEducation, setAcademicEducation] = useState("");
    const [profession, setProfession] = useState("");
    const [genre, setGenre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleChange = e => {
        if (e.target.name === "name") {
            setName(e.target.value);
        }

        if (e.target.name === "email") {
            setEmail(e.target.value);
        }

        if (e.target.name === "password") {
            setPassword(e.target.value);
        }

        if (e.target.name === "confirmatioPassword") {
            setConfirmPassword(e.target.value);
        }

    }

    function isFilledFields() {
        if (name == "" || birthdate == "" || academicEducation == "" || profession == "" || email == "" || password == "") {
            return false;
        }
        return true;
    }

    function getData(date, dateString) {
        console.log(date, dateString);
        setBirthdate(dateString);
    }

    function getAcademicEducation(valor) {
        setAcademicEducation(valor);
    }

    function getProfission(valor) {
        setProfession(valor);
    }

    function getGenre(valor) {
        setGenre(valor);
    }
    const handleSubmit = async e => {

        const people = {
            "name": name,
            "birthdate": birthdate,
            "academicEducation": academicEducation,
            "profession": profession,
            "genre": genre,
            "user": {
                "email": email,
                "password": password
            }
        }

        if (!isFilledFields()) {
            message.warning("Todos os campos devem ser preenchidos");
        } else {
            if (password == confirmPassword && validateFormLogin(email, password)) {

                service.ServiceSingUp(people);

            } else {
                message.warning("A senhas devem ser iguais");
            }
        }

    }

    return (
        <ContainerHeader>
            <FormResponsiveSingUp onFinish={e => handleSubmit(e)}>
                <Row>
                    <Col span={24}>
                        <h1>Cadastro</h1>
                        <div>
                            <LabelTitle className="f-left">Nome:</LabelTitle>
                            <InputDefault
                                placeholder="Insira seu nome"
                                type="text"
                                name="name"
                                value={name}
                                onChange={e => handleChange(e)}
                                required />
                        </div>
                    </Col>
                    <Col span={12} style={organizationCol}>
                        <div>
                            <LabelTitle className="f-left">Data de nascimento:</LabelTitle >
                        </div>
                        <div>
                            <DatePickerDefault
                                placeholder="Selecione a data"
                                className="f-left"
                                format="DD/MM/YYYY"
                                onChange={getData}
                                required/>
                        </div>
                    </Col>
                    <Col span={12} style={organizationCol}>
                        <div>
                            <LabelTitle className="f-left">Formação:</LabelTitle>
                        </div>
                        <div className="f-left">
                            <SelectDefault
                                showSearch
                                optionFilterProp="children"
                                name="academicEducation"
                                placeholder="Selecione a formação"
                                onChange={getAcademicEducation}
                                onFocus={onFocus}
                                onBlur={onBlur}
                                onSearch={onSearch}
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                required>
                                <OptionDefault value="1" title="Analfabeto">Analfabeto</OptionDefault>
                                <OptionDefault value="2" title="Até 5º Ano Incompleto">Até 5º Ano Incompleto</OptionDefault>
                                <OptionDefault value="3" title="5º Ano Completo">5º Ano Completo</OptionDefault>
                                <OptionDefault value="4" title="6º ao 9º Ano do Fundamental">6º ao 9º Ano do Fundamental</OptionDefault>
                                <OptionDefault value="5" title="Fundamental Completo">Fundamental Completo</OptionDefault>
                                <OptionDefault value="6" title="Médio Incompleto">Médio Incompleto</OptionDefault>
                                <OptionDefault value="7" title="Médio Completo">Médio Completo</OptionDefault>
                                <OptionDefault value="8" title="Superior Incompleto">Superior Incompleto</OptionDefault>
                                <OptionDefault value="9" title="Superior Completo">Superior Completo</OptionDefault>
                                <OptionDefault value="10" title="Mestrado">Mestrado</OptionDefault>
                                <OptionDefault value="11" title="Doutorado">Doutorado</OptionDefault>
                            </SelectDefault>
                        </div>
                    </Col>
                    <Col span={12} style={organizationCol}>
                        <div>
                            <LabelTitle className="f-left">Profissão:</LabelTitle>
                        </div>
                        <div className="f-left">
                            <SelectDefault
                                showSearch
                                placeholder="Selecione a profissão"
                                optionFilterProp="children"
                                name="profession"
                                onChange={getProfission}
                                onFocus={onFocus}
                                onBlur={onBlur}
                                onSearch={onSearch}
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }>
                                <OptionDefault value="1" title="Gestor" >Gestor</OptionDefault>
                                <OptionDefault value="2" title="Empreendedor">Empreendedor</OptionDefault>
                                <OptionDefault value="3" title="Contador">Contador</OptionDefault>
                                <OptionDefault value="4" title="Engenheiro">Engenheiro</OptionDefault>
                                <OptionDefault value="5" title="Economista">Economista</OptionDefault>
                                <OptionDefault value="6" title="Profissional da área do direito">Profissional da área do direito</OptionDefault>
                                <OptionDefault value="7" title="Profissional de TI">Profissional de TI</OptionDefault>
                                <OptionDefault value="8" title="Profissional de Marketing e Vendas">Profissional de Marketing e Vendas</OptionDefault>
                                <OptionDefault value="9" title="Agrônomo">Agrônomo</OptionDefault>
                                <OptionDefault value="10" title="Profissional de logística">Profissional de logística</OptionDefault>
                                <OptionDefault value="11" title="Outros">Outros</OptionDefault>
                            </SelectDefault>
                        </div>
                    </Col>
                    <Col span={12} style={organizationCol}>
                        <div>
                            <LabelTitle className="f-left">Gênero:</LabelTitle>
                        </div>
                        <div className="f-left">
                            <SelectDefault
                                showSearch
                                placeholder="Selecione gênero"
                                optionFilterProp="children"
                                name="genre"
                                onChange={getGenre}
                                onFocus={onFocus}
                                onBlur={onBlur}
                                onSearch={onSearch}
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }>
                                <OptionDefault value="1" title="Masculino" >Masculino</OptionDefault>
                                <OptionDefault value="2" title="Feminino">Feminino</OptionDefault>
                                <OptionDefault value="3" title="Não informar">Não informar</OptionDefault>
                            </SelectDefault>
                        </div>
                    </Col>
                    <Col span={24}>
                        <div>
                            <LabelTitle className="f-left">Email:</LabelTitle>
                            <InputDefault
                                placeholder="Insira seu email"
                                name="email"
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
                                type="password"
                                name="password"
                                value={password}
                                onChange={e => handleChange(e)}
                                required />
                        </div>
                    </Col>
                    <Col span={24}>
                        <div>
                            <LabelTitle className="f-left">Confirmação de senha:</LabelTitle>
                            <InputDefault
                                placeholder="Insira sua senha novamente"
                                name="confirmatioPassword"
                                type="password"
                                value={confirmPassword}
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

            </FormResponsiveSingUp>
        </ContainerHeader>
    );

}

