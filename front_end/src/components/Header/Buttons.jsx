import React from "react";
import { Stack, Box } from "@mui/material";
import styled from "styled-components";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

function Buttons() {
  const ButtonText = styled.div`
    display: flex;
    font-size: 16px;
  `;
  return (
    <Stack
      sx={{
        gap: "10px",
      }}
    >
      <Button
        variant="contained"
        size="large"
        onClick={() => {
          window.open("http://lk.abiturient.miigaik.ru/");
        }}
      >
        <ButtonText>Подать заявление</ButtonText>
      </Button>
      <Button
        variant="outlined"
        size="large"
        onClick={() => {
          window.open("https://miigaik.ru/Abitur/");
        }}
      >
        <ButtonText
          onClick={() => {
            window.open("https://miigaik.ru/Abitur/");
          }}
        >
          Информация о приеме
        </ButtonText>
      </Button>
      <Button
        variant="contained"
        size="large"
        onClick={() => {
          window.open("/abitur-extra");
        }}
      >
        <ButtonText>Списки поступающих</ButtonText>
      </Button>
      <Button
        variant="outlined"
        size="large"
        onClick={() => {
          window.open(" https://miigaik.ru/Abitur/question/");
        }}
      >
        <ButtonText>Вопрос приёмной комиссии</ButtonText>
      </Button>
    </Stack>
  );
}

export default Buttons;
