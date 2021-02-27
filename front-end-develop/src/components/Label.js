import styled from "styled-components";

export const LabelTitle = styled.label`
    color: #000;
    margin: ${props => (props.margin ? props.margin : '5px')};
    font-weight: bold;
    text-align: ${props => (props.textAlign ? props.textAlign : 'left')};
    float: left
`;

export const LabelDefault = styled.label`
    max-width ${props => (props.maxWidth ? props.maxWidth : 'auto')};
    word-wrap: break-word;
    color: #000;
    margin: ${props => (props.margin ? props.margin : '0000')};
    text-align: ${props => (props.textAlign ? props.textAlign : 'left')};
`;

export const LabelQuestion = styled(LabelDefault)`
    font-size: 30px;
`;