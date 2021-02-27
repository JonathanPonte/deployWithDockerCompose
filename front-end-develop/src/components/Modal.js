import styled from "styled-components";
import { Modal } from "antd";


export const ModalDefault = styled(Modal)`
  .ant-modal-content {
    border-radius: 40px;
    background: #FFF;
    text-align: center;
  }

  .ant-modal-close-x {
    border-radius: 0 15px 0 0;
    height: 34px;
    line-height: 42px;
    color: #fff;

    &:hover {
        color: #47337f;
    }
  }

  .ant-modal-header {
    border-radius: 65px 65px 0px 0px;
    padding: 6px 24px;
    background: #001529;
    border: none;

    .ant-modal-title {
      font-size: 14px;
      color: #fff;
      text-align: left;
    }
  }

  .ant-modal-footer {
    border: none;
  }
`;


export const ModalRecoverPassword = styled(ModalDefault)`
  .ant-modal-content {
    h3 {
        color: #000;
    }

    span {
      max-width: 320px;
    }
  }

  .ant-modal-footer {
      display: flex;

      button {
        margin: auto;
      }
  }
`;

export const ModalImage = styled(Modal)`


  .ant-modal-content {
    border-radius: 40px;
    background: #FFF;
    text-align: center;
  }
  
  .ant-modal-body {
    padding: 10px;
   }

  .ant-modal-header {
    border-radius: 65px 65px 0px 0px;
    padding: 6px 24px;
    background: #001529;
    border: none;

    .ant-modal-title {
      font-size: 14px;
      color: #fff;
      text-align: left;
    }
  }

  .ant-modal-close-x {
    border-radius: 0 15px 0 0;
    height: 34px;
    line-height: 42px;
    color: #fff;

    &:hover {
        color: #47337f;
    }
  }

  .ant-modal-footer {
    border: none;
  }
`;