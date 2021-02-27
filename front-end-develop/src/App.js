import React from 'react';
import Routes from "./router/index";
import HeaderNav from "./layout/Header";

//CSS
import "./assets/style/Utilities.css";

//Ant Design
import "antd/dist/antd.css";
import { Layout, Row, Col, Dropdown, Menu } from "antd";


const { Header, Content } = Layout;


/* Inline CSS */

const contentStyle = {
  margin: "auto",
  textAlign: "center",
  display: "flex",
  minHeight: "calc(100vh - 64px)"
};



const header={
  minWidth: "300px",
}

function App() {
  const loc = window.location.pathname;

  
  return (
    <Row>
      <Col span={24}>
        <Layout>
          <Row>
            <Col span={24}>
              <Header className="d-flex" style={header}>
                <HeaderNav />
              </Header>
            </Col>
          </Row>
          <Row >
            <Col span={24}>
              <Content style={contentStyle}>
                <Routes/>
              </Content>
            </Col>
          </Row>
        </Layout>
      </Col>
    </Row>
  );
}



export default App;
