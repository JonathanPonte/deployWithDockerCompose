import styled from "styled-components";
import { Card } from "antd";

/*  CARDS DEFAULT */

export const CardDefault = styled(Card)`
margin: ${props => (props.margin ? props.margin : 'auto')};
box-shadow: 0px 2px 7px 0px #484747;
border: none;
border-radius: 20px;
padding: 0;
max-height: 300px;
overflow-y: auto;

force-overflow {
  background-color: #fff;
}

`;

/*  CARDS DEFAULT */

export const CardLogin = styled(CardDefault)`
  background: #bdb8d8;
  width: 320px;
  margin: auto;
  border: none;

  img {
    height: 43px;
    margin: 35px;
  }
`;

export const CardScale = styled(CardDefault)`
  padding: 0;

  img {
    height: 200px;
    border-radius: 20px;
  }
`;

export const CardListDefault = styled(Card)`
  box-shadow: 0px 2px 7px 0px #484747;
  border: 1px solid #000;
  border-radius: 36px;
  padding: 5px;
  min-height: 400px;
  margin: ${props => (props.margin ? props.margin : 'auto')};
  background: ${props => (props.background ? props.background : 'auto')};
  

  .ant-card-body {
    margin: 2px 20px 5px 0;
    padding: 0;
    max-height: 400px;
    overflow-y: scroll;
  }

  .ant-card-head {
    background: #7ea230;
    border-radius: 28px 28px 0 0;
    border-bottom: 1px solid #47337f;

    .ant-card-head-title {
      padding: 5px 0;
      text-align: initial;
      color: #fff;
    }

    .ant-card-extra {
      padding: 5px 0;
    }
  }
`;

