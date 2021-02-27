import styled from "styled-components";


export const UlDefault = styled.ul`
display: flex;
background: 'black';
margin: 0;



li {
    display: flex;
    padding: 0 20px;
    list-style-type: none;
    
}

a {
    color: #fff;
    height: 100%;
    width: 100%;
}

li:hover {
    text-decoration: underline;
}

`;

export const UlHeaderOut = styled(UlDefault)`
   margin: auto 0 auto auto;
   button{
    display: none;
   }

   @media(max-width: 480px){
    
    li{
        display: none;
        
    }

    button{
        display: flex;
    }
  }


`;


export const UlHeaderInside = styled(UlDefault)`
    margin: auto;
`;
