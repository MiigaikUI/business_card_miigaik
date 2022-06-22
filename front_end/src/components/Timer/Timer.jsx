import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";

export default function Timer() {
  const [Days, setDays] = useState("00");
  const [Hours, setHours] = useState("00");
  const [Minutes, setMinutes] = useState("00");
  const [intamural, setIntamural] = useState([]);

  const fetchData = async (url) => {
    const response = await fetch(`/api/v1${url}`);
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    fetchData('/in-event/').then((data) => {
      setIntamural(data);
    });
 
  }, []);



  let interval = useRef();
  let title;
 
  const activeStepFinder = (events) => {
    let current;
    events.map((item, index) => {
      let date = new Date(item.date);
      let actual_date = new Date();
      if (actual_date > date) {
        current = index;
      }
  
    });

    return current + 1;
  };
  var timeTo = new Date()
  if (intamural.length > 0){
    timeTo = new Date(intamural[activeStepFinder(intamural)].date)
  }

  const activeTitleFinder = () => {
    intamural.map((item, index) => {
      let date = new Date(item.date);
      let actual_date = new Date();
      if (actual_date > date) {
        title = intamural[index + 1].text;
      }
    });
    return title;
  };

  const startTimer = () => {

    interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = timeTo - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

      if (distance < 0) {
        //stop
        clearInterval(interval.current);
      } else {
        setDays(days);
        setHours(hours);
        setMinutes(minutes);
      }
    }, 1000);
  };

  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(interval.current);
    };
  });

  const TimerEl = styled.div`
    font-family: "Roboto Slab", serif;
    display: flex;
    flex-direction: column;
    text-align: center;
    width: 6rem;
    gap: 1rem;
  `;

  const Number = styled.div`
    font-size: 48px;
    color: white;
    font-family: "Roboto Slab", serif;
  `;

  const Title = styled.div`
    color: white;
    font-size: 18px;
  `;

  const StyledTimer = styled.div`
    padding: 10px;
    background-color: rgb(25, 118, 210);
    width: 370px;
    min-height: 160px;
    border: 1px solid rgb(25, 118, 210);
    border-radius: 10px;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    box-shadow: -2px 4px 8px 0px rgba(34, 60, 80, 0.2);
    @media (max-width: 900px) {
      display: none;
    }
  `;

  const TimerTitle = styled.div`
    font-size: 24px;
    text-align: center;
    font-family: "Roboto Slab", serif;
    color: white;
  `;
  return (
    <StyledTimer>
      <TimerTitle>{activeTitleFinder()}</TimerTitle>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          textAlign: "center",
          height: "80%",
        }}
      >
        <TimerEl>
          <Number>{Days}</Number>
          <Title>Дней</Title>
        </TimerEl>
        <TimerEl>
          <Number>{Hours}</Number>
          <Title>Часов</Title>
        </TimerEl>
        <TimerEl>
          <Number>{Minutes}</Number>
          <Title>Минут</Title>
        </TimerEl>
      </Box>
    </StyledTimer>
  );
}
