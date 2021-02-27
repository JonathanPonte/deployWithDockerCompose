import styled from "styled-components";

export const Container = styled.div`
  min-height: 100%;
  display: flex;
  margin: ${props => (props.margin ? props.margin : 'auto')};
  text-align: center;
  width: 80%
`;

export const ContainerHeader = styled.div`
height: 100%;
width: 100%;
padding: 30px;
margin: ${props => (props.margin ? props.margin : 'none')};

`;


export const ContainerResponsiveListAdm = styled.div`
height: 100%;
width: 100%;
padding: 30px;
margin: ${props => (props.margin ? props.margin : 'none')};

#btt_responsive{
  display: none;
 }

@media(max-width: 880px){

  .ant-input-search{
    width: 250px
  }

}

@media(max-width: 730px){

  margin: 0 10px 0 10px;

}

@media(max-width: 500px){

  #btt_normal{
    display: none;
   }
  
  #btt_responsive{
    display: block;
   }

}


`;

export const ContainerScaleListinigResponsive = styled.div`
 height: 100%;
 width: 100%;
 padding: 30px;
 margin: ${props => (props.margin ? props.margin : 'none')};
 #btt_responsive{
  display: none;
 }

 @media(max-width: 600px){

  .ant-input-search{
    max-width: 300px;
  }
}


 @media(max-width: 500px){

  .ant-input-search{
    max-width: 300px;
  }

  #btt_normal{
    display: none;
   }

  #btt_responsive{
    display: block;
   }

 }

 @media(max-width: 400px){

  .ant-input-search{
    max-width: 250px;
  }

  #btt_normal{
    display: none;
   }

  #btt_responsive{
    display: block;
   }

 }


`;

export const ContainerScale = styled.div`
 margin: ${props => (props.margin ? props.margin : 'auto')};
 width: fit-content;
 display: inline-block;

 img {
  width: 280px;
  height: 180px;
  border-radius: 20px 20px 0 0;
  box-shadow: 1px 2px 10px 1px #484747;
 }

 h3 {
  width: 100%;
  background: rgba(0,0,0,0.5);
  color: white;
  font-size: 20px;
  text-align: center;
  border-radius: 0px 0px 20px 20px;
  box-shadow: 1px 2px 10px 1px #484747;
  margin-bottom: 0;
}

&:hover {
  box-shadow: rgb(0, 0, 0) 1px 1px 5px;
  border-radius: 20px 20px 20px 20px;
  height: 50%;
}

`;


export const DivInputFileDefault = styled.div`
  display: flex;
  height: 32px;
  width: 200px;
  border: 1px solid #000;
  border-radius: 20px;
  background: #fff;
  box-shadow: none;

  input[type="file"] {
    display: none;
  }

  label {
    max-width: 100%;
    width: 100%;
    padding: 4px;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  span {
    display: flex;
    height: 100%;
    width: 40px;
    border: 1px solid #000;
    border-radius: 20px;
    background-color: #020746;
    margin: auto 5px auto -1px;
  }

  svg {
    font-size: 18px;
    color: #fff;
    margin: auto;
  }

  &:active: {
    border-color: #bdb8d8;
  }

  &:hover {
    border-color: #bdb8d8;

    span {
      border-color: #bdb8d8;
    }
  }

  &:focus {
    border-color: #bdb8d8;
    box-shadow: 0px 0px 6px #47337f;
  }
`;


export const DivInputFileNewScale = styled.div`
  display: flex;
  height: 32px;
  width: 200px;
  border: 1px solid #000;
  border-radius: 20px;
  background: #fff;
  box-shadow: none;

  @media(max-width: 700px){
    width: 250px
  }

  input[type="file"] {
    display: none;
  }

  label {
    max-width: 100%;
    width: 100%;
    padding: 4px;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  span {
    display: flex;
    height: 100%;
    width: 40px;
    border: 1px solid #000;
    border-radius: 20px;
    background-color: #020746;
    margin: auto 5px auto -1px;
  }

  svg {
    font-size: 18px;
    color: #fff;
    margin: auto;
  }

  &:active: {
    border-color: #bdb8d8;
  }

  &:hover {
    border-color: #bdb8d8;

    span {
      border-color: #bdb8d8;
    }
  }

  &:focus {
    border-color: #bdb8d8;
    box-shadow: 0px 0px 6px #47337f;
  }
`;

export const DivButtonDeleteFile = styled.div`
  display: flex;
 
  .deleteButton {
    display: flex;
    margin-left: 10px;

    svg {
      font-size: 18px;
      color: #020746;
      margin: auto;
    }

    svg:hover {
      color: #000;
    }
  }
`;


export const DivNumberItem = styled.div`
  display: flex;
  max-width: 35px;
  width: 35px;
  height: 35px;
  max-height: 35px;
  border: 1px solid #000;
  border-radius: 20px;
  background-color: #fff;
  margin: auto 5px auto -1px;
  padding: 10px;
  align-items: center;
`;

export const DivNumberQuestion = styled.div`
  display: flex;
  height: 100%;
  width: 35px;
  margin: auto 5px auto -1px;
  padding-left: 13px;
  font-weight: bold;
`;

export const DivLabelFormat = styled.div`
  min-height ${props => (props.minHeight? props.minHeight : 'auto')};
  max-width ${props => (props.maxWidth ? props.maxWidth : 'auto')};
  min-width ${props => (props.minWidth ? props.minWidth : 'auto')};
  display: ${props => (props.display ? props.display : 'flex')};
  width ${props => (props.width? props.width : 'auto')};
  border: 1px solid #000;
  border-radius: 20px;
  background-color: #fff;
  margin: ${props => (props.margin ? props.margin : '5px')};
  padding: ${props => (props.padding ? props.padding : '5px')};
`;

export const DivLabelQuestion = styled.div`
  display: flex;
  height: 100%;
`;

export const ContainerHeaderAdm = styled.div`
height: 100%;
width: 80%;
padding: 30px;
`;