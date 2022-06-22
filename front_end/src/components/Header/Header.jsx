import { Stack } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import styled from "styled-components";
// import "../UI/GlobalStyles";
import Buttons from "./Buttons";
import map from "./map.svg";
import Timer from "../Timer/Timer";

const Img = styled.img`
 @media(max-width:900px){
   display:none
 }
`;

const Title = styled.div`
  max-width: 500px;
  font-size: 48px;
  text-align: left;
  display: flex;
  justify-self: center;
  align-self: center;
  @media (max-width: 1200px) {
    font-size: 48px;
  }
  @media (max-width: 900px) {
    font-size: 32px;
    text-align:center
  }
`;

const SubTitle = styled.div`
  font-size:24px;
  color:grey;
  @media (max-width: 900px) {
    align-self:center
  }
  `;

const Header = () => {
 
  return (
   <Box sx={{
    overflow:'hidden'
   }}>
     <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow:'hidden'
      }}
    >  
      <Img class="map" src={map} style={{ height:'100vh',position:'absolute', zIndex:-1000,
    left:'45%',transform: "rotateX(10deg)", overflow:'hidden'
    }}>
      </Img>
      <Stack
        direction={{
          xs: "column",
          sm: "column",
          md: "row",
          lg: "row",
          xl: "row",
        }}
        spacing={{ xs: 1, sm: 2, md: 2, lg: 35, xl: 35 }}
      >
        <Stack spacing={{ xs: 2, sm: 2, md: 3, lg: 5, xl: 5 }}>
       
          <Title>
           Московский государственный университет геодезии и картографии
          </Title>
          <SubTitle>Уважая прошлое, создаём будущее
          </SubTitle>
          <Buttons />
        </Stack>
        <Stack
          sx={{
            alignSelf: "center",
          }}
        >
          <Timer />
        </Stack>
      </Stack>
    </Box>
    
   </Box>
  
  );
}

export default Header;
