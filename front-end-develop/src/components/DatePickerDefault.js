import styled from "styled-components";
import { DatePicker } from 'antd';


export const DatePickerDefault = styled(DatePicker)`
border: 1px solid #000;
border-radius: 20px;
box-shadow: none

&:active: {
    border-color: #bdb8d8;
  }

&:hover {
    border-color: #bdb8d8;
  }

&:focus {
    border-color: #bdb8d8;
    box-shadow: 0px 0px 6px #47337f;
  }
`;