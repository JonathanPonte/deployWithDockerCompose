import React, { useState, useEffect } from 'react'
import { ContainerScaleListinigResponsive, ContainerScale } from '../../components/Container';
import { Row, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { InputSearch } from '../../components/input';
import { ButtonDefault } from '../../components/Button';
import ScalesListingService from "../../service/ScalesListing/ScalesListingService";
import { useSelector } from "react-redux";
import { isAuthenticatedAdm, isAuthenticatedPeople, login, logout } from "../../service/Auth";


// const cardInfo = [
//     { name: "Escala 1", image: "https://blog.hotmart.com/blog/2017/10/BLOG_empreendedorismo-no-brasil-670x419.png" },
//     { name: "Escala 2", image: "https://cdn.univicosa.com.br/img/portal/noticia/img/adm_7.jpg" },
//     { name: "Escala 4", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR6E53vntX4qUbkGgjnQVX51DWO-PHpeVl4uw&usqp=CAU" },
//     { name: "Escala 4", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRsJR0VJyyAjaofK_uJtW_3FV3f3fSUs-K9YA&usqp=CAU" },
//     { name: "Escala 5", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ-8nx_IXkPnCUKJIpRXB49dKN3_RwYqZMjRQ&usqp=CAU" },
// ]



const divS = {
    margin: '10px 0 0 0',
    display: 'inline-block',
    width: '100%',
    textAlign: "initial",
};

console.log("ADM1: ", isAuthenticatedAdm());
console.log("PEOPLE1: ", isAuthenticatedPeople());

function islogged() {

    if (isAuthenticatedAdm() || isAuthenticatedPeople()) {
        return true;
    } else {
        return false;
    }

}

export default function ScaleLinsting() {

    const [search, setSearch] = useState("");
    const [cardScales, setCardScales] = useState("");
    const [listCardDynamic, setlistCardDynamic] = useState("");
    const userRedux = useSelector(state => state.user);

    useEffect(() => {
        ScalesListingService.ScaleListing((response) => {
            
            setCardScales(response);
            setlistCardDynamic(response);
        })
    }, [])


    const renderCard = (card) => {

        return (
            <ContainerScale margin="40px 20px 0px 10px" key={card._id} className="box">
                <a href={islogged() ? "/scale/" + card._id : "/login"}>
                    <img src={"http://localhost:81/back/api/" + card.image} />
                    <h3>{card.title}</h3>
                </a>
            </ContainerScale>
        )
    }

    const handleChange = e => {
        setSearch(e.target.value);
      
        setlistCardDynamic(cardScales.filter( card => card.title.toLowerCase().includes(e.target.value.toLowerCase())));  
    }

    const handleSearch = e => {

    }

    return listCardDynamic ? (
        <ContainerScaleListinigResponsive>
            <Row>
                <Col span={24}>
                    <div>
                        <InputSearch
                            minWidth="200px"
                            maxWidth="400px"
                            float="left"
                            placeholder="Nome da escala"
                            value={search}
                            onChange={e => handleChange(e)}
                            onSearch={e => handleSearch(e)}
                            allowClear />
                        {isAuthenticatedAdm() && isAuthenticatedPeople() === false ?
                            <>
                            <ButtonDefault id="btt_normal" href="/new_scale" float="right" icon={<PlusOutlined />}>
                                Nova escala
                            </ButtonDefault>
                            <ButtonDefault id="btt_responsive" href="/new_scale" float="right" icon={<PlusOutlined />}/>    
                            </>
                            : ""}
                    </div>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <div style={divS}>
                        {listCardDynamic.map(renderCard)}
                    </div>
                </Col>
            </Row>
        </ContainerScaleListinigResponsive>
    ) : <div>Loading...</div>;
}