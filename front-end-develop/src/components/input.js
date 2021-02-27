import styled from "styled-components";
import PropTypes from 'prop-types';
import { Input } from "antd";

const { Search } = Input;


export const InputSearch = styled(Search)`
    min-width: ${props => (props.minWidth ? props.minWidth : 'auto')};
    max-width: ${props => (props.maxWidth ? props.maxWidth : 'auto')};
    margin: ${props => (props.margin ? props.margin : 'auto')};
    float: ${props => (props.float ? props.float : 'none')};
    border: 1px solid #000;
    border-radius: 20px;
    box-shadow: none;

    &:active: {
        border-color: #bdb8d8;
      }
    
      &:hover {
        border-color: #bdb8d8;
      }
    
      &:focus {
        border-color: #000;
        box-shadow: 0px 0px 6px #000;
      }
`;

export const InputDefault = styled(Input)`
    min-width: ${props => (props.minWidth ? props.minWidth : 'auto')};
    max-width: ${props => (props.maxWidth ? props.maxWidth : 'auto')};
    margin: ${props => (props.margin ? props.margin : 'auto')};
    float: ${props => (props.float ? props.float : 'none')};
    border: 1px solid #000;
    border-radius: 20px;
    box-shadow: none;
    &:active: {
        border-color: #bdb8d8;
      }
    
      &:hover {
        border-color: #bdb8d8;
       }
    
      &:focus {
        border-color: #000;
        box-shadow: 0px 0px 6px #000;
      }
`;

export const InputItemCard = styled(Input)`
 min-width: ${props => (props.minWidth ? props.minWidth : 'auto')};
 max-width: ${props => (props.maxWidth ? props.maxWidth : 'auto')};
 margin: ${props => (props.margin ? props.margin : 'auto')};
 float: ${props => (props.float ? props.float : 'none')};
 border: 1px solid #000;
 border-radius: 20px;
 box-shadow: none;
`;

export const InputSingUp = styled(InputDefault)`

margin-bottom: 10px

`;


export const TextArea = styled(InputDefault.TextArea)`
    max-width: ${props => (props.maxWidth ? props.maxWidth : 'auto')};
    min-width: ${props => (props.minWidth ? props.minWidth : 'auto')};
    float: ${props => (props.float ? props.float : 'none')};
    border: 1px solid #000;
    border-radius: 20px;
    box-shadow: none;

    &:active: {
        border-color: #bdb8d8;
      }
    
      &:hover {
        border-color: #bdb8d8;
      }
    
      &:focus {
        border-color: #000;
        box-shadow: 0px 0px 6px #000;
      }
`

