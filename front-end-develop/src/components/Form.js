import styled from "styled-components";
import Form from 'antd/lib/form/Form';


export const FormDefault = styled(Form)`
 height: 100%;
 width: 50%;
 margin: auto;

 h1 {
    font-weight: bold;
    font-size: 30px;
  }

  h2 {
    font-weight: bold;
  }
`;

export const FormResponsiveNewAdm = styled(Form)`
 height: 100%;
 width: 50%;
 margin: auto;

  h1 {
    font-weight: bold;
    font-size: 30px;
  }

  h2 {
    font-weight: bold;
  }

  @media(max-width: 500px){
      width:100%;
  }

`;

export const FormResponsiveChangePassword = styled(Form)`
 height: 100%;
 width: 50%;
 margin: auto;

  h1 {
    font-weight: bold;
    font-size: 30px;
  }

  h2 {
    font-weight: bold;
  }

  @media(max-width: 500px){
      width:80%;
  }

`;

export const FormResponsiveAddQuestion = styled(Form)`
 
 @media(max-width: 780px){
  
  .ant-input{
    max-width: 280px; 
  }

 }

 @media(max-width: 700px){
  display: flex;
  .ant-input{
    width: 250px;
  }
 } 
 

`;

export const FormResponsiveNewScale = styled(Form)`
 height: 100%;
 width: 60%;
 margin: auto;

 #col_img_responsive{
   display:none;
 }

 #col_img_normal{
  flex: none;
 }

 h1 {
    font-weight: bold;
    font-size: 30px;
  }

  h2 {
    font-weight: bold;
  }

  @media(max-width: 1130px){
    width: 70%;
  }

  @media(max-width: 1080px){
    width: 80%;
  }

  @media(max-width: 980px){
    width: 90%;
  }

  @media(max-width: 870px){
    width: 100%;
  }

  @media(max-width: 720px){

    #col_img_responsive{
      display: grid;
    }
   
    #col_img_normal{
     display: none
    }

    .ant-row{
      display: grid;
    }

    #input_value_min{
      min-width: 250px;
    }

    #input_value_max{
      min-width: 250px;
    }

    #input_label_max{
      min-width: 250px;
    }

    #input_label_min{
      min-width: 250px;
    }

  }

`;

export const FormResponsiveSingUp = styled(Form)`
 height: 100%;
 width: 50%;
 margin: auto;

 .ant-select{
  width:200px;
 }
 
 .ant-picker{
  width:200px;
 }

 @media(max-width: 900px){
  margin: auto;

  .ant-row{
    display: grid;
  }

  .ant-select{
    width:500px;
  }

  .ant-picker{
    width:500px;
   }

  div{
    width:500px;
  }

}

@media(max-width: 800px){
  margin: auto;
  margin-left: 15%;
  

  .ant-row{
    display: grid;
  }

  .ant-select{
    width:500px;
  }

  .ant-picker{
    width:500px;
   }

  div{
    width:500px;
  }

}

 @media(max-width: 480px){
  margin: unset;

  .ant-row{
    display: grid;
  }

  .ant-select{
    width:300px;
  }

  .ant-picker{
    width:300px;
   }

  div{
    width:300px;
  }

}

 h1 {
    font-weight: bold;
    font-size: 30px;
  }

  h2 {
    font-weight: bold;
  }

  
  
`;

export const FormDefaultInformations = styled(Form)`
 height: 100%;
 width: 70%;
 margin: auto;

 h1 {
    font-weight: bold;
    font-size: 30px;
  }

  h2 {
    font-weight: bold;
  }
`;

export const FormInformationScale = styled(Form)`
 min-width: 700px;
 height: 100%;
 width: 80%;
 margin: auto;
 

 h1 {
    font-weight: bold;
    font-size: 30px;
    width: fit-content;
    display: inline;
    float: left;
  }
`;

export const FormResponsiveInformationScale = styled(Form)`
 min-width: 700px;
 height: 100%;
 width: 80%;
 margin: auto;
 
 #btt_div_responsive{
   display: none;
 }

 h1 {
    font-weight: bold;
    font-size: 30px;
    width: fit-content;
    display: inline;
    float: left;
  }

  @media(max-width: 700px){
    min-width: 550px;   
  }

  @media(max-width: 600px){
    min-width: unset;
    width: unset;

    .ant-btn{
      font-size: 10px;
    }

  }

  @media(max-width: 500px){
    
    .ant-row{
      display: grid;
    }

  }

  @media(max-width: 450px){

    #btt_div_normal{
      display: none;
    }
    
    #btt_div_responsive{
      display: inherit;
    }


  }


`;

export const FormResponsiveInformationScaleUser = styled(Form)`
 min-width: 700px;
 height: 100%;
 width: 80%;
 margin: auto;
 

 h1 {
    font-weight: bold;
    font-size: 30px;
    width: fit-content;
    display: inline;
    float: left;
  }

  @media(max-width: 700px){
    min-width: 550px;   
  }

  @media(max-width: 600px){
    min-width: unset;
    width: unset;

    .ant-btn{
      font-size: 10px;
    }

  }

  @media(max-width: 500px){
    
    .ant-row{
      display: grid;
    }

    #div_avarege{
      width: 60px;
      padding: 2px;
      padding-left: 16px;
    }

  }

`;
