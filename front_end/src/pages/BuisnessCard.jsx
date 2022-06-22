import { Container } from "@mui/system";
import React from "react";
import Calc from "../components/Calc/Calc";
import Header from "../components/Header/Header";
import Timeline from "../components/Timeline/Timeline";

const BuisnessCard = () => {
  return <Container>
    <Header/>
    <Timeline />
    <Calc />
  </Container>;
};

export default BuisnessCard;
