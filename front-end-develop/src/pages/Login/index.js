import React, { useState } from 'react';
import Logo from '../../assets/images/logo512.png';
import Face from '../../assets/images/face.png'
import Google from '../../assets/images/google.png'
import { useDispatch, useSelector } from 'react-redux';
import { onLogin } from "../../redux/user/actions";
import { validateFormLogin } from "../../validate/validateLogin";
import { Container } from '../../components/Container';
import { InputDefault } from '../../components/input';
import { LabelDefault, LabelTitle} from '../../components/Label';
import { ModalRecoverPassword } from '../../components/Modal'
import { ButtonLogin, ButtonRecoverEmail } from '../../components/Button';
import Form from 'antd/lib/form/Form';
import { message } from 'antd';


const form = {
    width: "300px",
    height: "500px",
    margin: "auto",
};

const img = {
    width: 200,
    height: 200
}

const imgSocialMedia = {
    width: 30,
    height: 30,
    marginTop: 20,
    marginRight: 20,
    marginLeft: 10
}

const h1Style = {
    fontSize: "40px",
    marginTop: "20%",
    color: "#001529",
}

export default function Login() {

    const dispatch = useDispatch();
    const statusLoadingRedux = useSelector(state => (state.user.isSubmitting));
    const errorRedux = useSelector(state => (state.user.error));
   
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = e => {
        setLoading(true);
        setTimeout(() => {
            setVisible(false);
            setLoading(false);
        }, 3000);
    }

    const handleCancel = e => {
        setVisible(false);
    }

    const handleSubmit = async e => {
        if (validateFormLogin(email, password)) {
            dispatch(onLogin(email, password));
        } else {

            await setError("Dados inválidos.");
            message.warning("Dados inválidos")

            setTimeout(() => {
                setError("DEU RUIM");
            }, 3000);
        }
    }

    const handleChange = e => {
        switch (e.target.name) {
            case "email":
                setEmail(e.target.value);
                console.log(email);
                console.log(e.target.value);
                break;
            case "password":
                setPassword(e.target.value);
                break;

        }
    }

    return (
        <Container>

            <Form style={form} onFinish={e => handleSubmit(e)}>

                {/* <img src={Logo} style={img} /> */}
                <h1 style={h1Style}>Ent Project</h1>
                <br />
                <LabelTitle className="f-left">
                    Email
                </LabelTitle>
                <InputDefault
                    placeholder="Insira seu email"
                    onChange={e => handleChange(e)}
                    value={email}
                    name="email"
                    required
                />
                <LabelTitle className="f-left">
                    Senha
                </LabelTitle>
                <InputDefault
                    placeholder="Insira sua senha"
                    onChange={e => handleChange(e)}
                    value={password}
                    name="password"
                    type="password"
                    required
                />

                {/* <a className="f-left" htmlType="Button" onClick={showModal}>
                    Esqueceu sua senha?
                </a> */}
                <ModalRecoverPassword
                    title="ESQUECI MINHA SENHA"
                    visible={visible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={
                        <ButtonLogin key="submit" type="primary" loading={loading} onClick={handleOk} >
                            Enviar
                        </ButtonLogin>
                    }
                >
                    <Form>
                        <h3>Informe seu email.</h3>
                        <InputDefault
                            type="email"
                            placeholder="Insira seu email"
                        />
                    </Form>
                </ModalRecoverPassword>
                <br />
                <br />

                <ButtonLogin htmlType="submit">
                    Entrar
                </ButtonLogin>

                <br />

                {/* <a href="https://www.facebook.com/"> <img src={Face} style={imgSocialMedia} /> </a>
                <a href="https://www.google.com/"><img src={Google} style={imgSocialMedia} /></a> */}

            </Form>
        </Container>
    );

}
