import React, { useEffect } from "react";
import { FilledInput, List, ListItem, Stack, Typography } from "@mui/material";
import { useState, useContext } from "react";
import styled from "@emotion/styled";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Carousel from "react-material-ui-carousel";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

// import { ApiUrl } from "../Utils/Api";
const CardText = styled.div`
  font-size: 20px;
  line-height: 30px;
  font-family: "Roboto Slab" serif;
`;
const Title = styled.div`
  margin-top: 16px;
  font-family: "Roboto Slab", serif;
  font-size: 28px;
  max-width: 60%;
  @media (max-width: 984px) {
    max-width: 100%;
  }
`;

const Calc = () => {
  const [formList, setFormList] = useState([]);
  const [trends, setTrends] = useState([]);
  const [data, setData] = useState([]);
  let [url, setUrl] = useState("");
  let [exams, setExams] = useState([]);

  // Get exams from API
  const fetchData = async (url) => {
    const response = await fetch(`/api/v1/exam/${url}`);
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    fetchData('').then((data) => {
      setExams(data);
    });
    fetchData("use/").then((data) => {
      setData(data);
    });
  }, []);

  // Get result of calc from API
  const CalcResult = async (url) => {
    const response = await fetch(`/api/v1/trend/calc/${url}`);
    const CalcTrends = await response.json();
    // console.log(CalcTrends)
    setTrends(CalcTrends);
  };

  // URL constructor
  let localUrl;
  let sum;
  const GetTrends = () => {
    let params = {
      marks: [],
      exams: [],
    };
    data.map((item) =>
      item.status == true
        ? item.mark > item.min_mark
          ? (params.marks.push(`marks=${item.mark}`),
            params.exams.push(`exams=${item.id}`))
          : alert(
              `Минимальное допустимое значение в поле ${item.title}: ${item.min_mark}`
            )
        : undefined
    );
    localUrl = `?${params.exams.join("&")}&${params.marks.join("&")}`;
    setUrl(localUrl);
  };

  return (
    <Stack
      sx={{
        minHeight: "100vh",
      }}
    >
      <Title>
        Калькулятор ЕГЭ по направлениям подготовки бакалавриата и специалитета
      </Title>
      <Box
        sx={{
          fontFamily: '"Roboto Slab", serif',
          marginTop: "12px",
          marginBottom: "12px",
          fontSize: "18px",
        }}
      >
        Выберите предмет ЕГЭ
      </Box>
      <Stack
        direction={{
          xs: "column",
          sm: "row",
          md: "row",
          lg: "row",
          xl: "row",
        }}
        sx={{
          justifyContent: "space-between",
        }}
      >
        <Select
          sx={{
            minWidth: "250px",
          }}
          onChange={(event) => {
            // data[event.target.key].status = true;
            setData((data) => [...data]);
            data.map((item) => {
              if (item.id == event.target.value) {
                item.status = true;
              }
            });
            setData((data) => data);
          }}
          value="Математика"
        >
          <MenuItem disabled>Выберите предмет егэ</MenuItem>
          {data.map((item, index) =>
            item.status == true ? (
              <MenuItem key={index} value={item.id} disabled hidden>
                {item.title}
              </MenuItem>
            ) : (
              <MenuItem key={index} value={item.id}>
                {item.title}
              </MenuItem>
            )
          )}
        </Select>
        <Button
          sx={{
            fontFamily: '"Roboto Slab", serif',
          }}
          variant="outlined"
          onClick={() => {
            data.map((item) => {
              item.status = false;
            });
            setData((data) => [...data]);
            setTrends((trends) => []);
          }}
        >
          Очистить
        </Button>
      </Stack>

      <Stack
        sx={{
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
        direction="row"
      >
        {data.map((item, index) =>
          item.status == true ? (
            <Stack
              direction="row"
              sx={{
                marginTop: "10px",
              }}
            >
              <FormControl>
                <InputLabel sx={{}}>{item.title}</InputLabel>
                <FilledInput
                  sx={{
                    textAlign: "center",
                    width: "150px",
                    height: "50px",
                  }}
                  visible={item.status}
                  type="number"
                  name={item.examId}
                  onChange={(event) => {
                    data[index].mark = Number(event.target.value);
                    if (event.target.value > 100) {
                      event.target.value = 100;
                    }
                    if (event.target.value < 0) {
                      event.target.value = 0;
                    }
                  }}
                ></FilledInput>
              </FormControl>
              <Button
                sx={{
                  fontFamily: '"Roboto Slab", serif',
                }}
                variant="outlined"
                onClick={() => {
                  data[index].status = false;
                  setData((data) => [...data]);
                }}
              >
                Удалить
              </Button>
            </Stack>
          ) : // () => alert(item)
          null
        )}
      </Stack>
      <Stack>
        <Button
          sx={{
            fontFamily: '"Roboto Slab", serif',
            marginTop: "10px",
          }}
          variant="contained"
          onClick={() => {
            GetTrends();
            if (localUrl != "?&") {
              CalcResult(localUrl);
            }
          }}
        >
          Расчет
        </Button>
      </Stack>
      <Stack>
        {trends.map((e) => {
          <h1>{e.title}</h1>;
        })}
        <Carousel
          autoPlay={false}
          animation="slide"
          sx={{
            marginTop: "10px",
          }}
        >
          {trends.map((e) => (
            <Card
              variant="outlined"
              sx={{
                paddingLeft: "40px",
                paddingRight: "40px",
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    fontSize: "28px",
                    fontFamily: '"Roboto slab", serif',
                  }}
                >
                  {e.code} {e.title}
                </Box>
                <Stack
                  sx={{
                    justifyContent: "space-between",
                  }}
                  direction={{
                    xs: "column",
                    sm: "column",
                    md: "row",
                    lg: "row",
                    xl: "row",
                  }}
                >
                  <Stack>
                    <CardText>
                      Уровень образования: {e.education_level}
                    </CardText>
                    <CardText>Форма обучения: {e.education_form}</CardText>
                    <CardText>Экзамены: </CardText>
                    {e.exams.first_exam_group.map((index)=>
                    <Box>
                      <CardText>{exams[index].title} {'('}{exams[index].use ? 'ЕГЭ' :  'Внутренний экзамен)'}</CardText>
                     
                    </Box>)}
                    {e.exams.second_exam_group.map((index)=>
                    <Box>
                      <CardText>{exams[index].title} {'('}{exams[index].use ? 'ЕГЭ' :  'Внутренний экзамен)'}</CardText>
                      
                    </Box>)}
                    {e.exams.third_exam_group.map((index)=>
                    <Box>
                      <CardText>{exams[index].title} {'('}{exams[index].use ? 'ЕГЭ' :  'Внутренний экзамен)'}</CardText>
                     
                    </Box>)}
                    
                  </Stack>
                  <Stack>
                    <CardText>Средний балл: {e.mark}</CardText>
                    <CardText>Бюджетных мест: {e.budget}</CardText>
                    <CardText>Платных мест: {e.paid}</CardText>
                  </Stack>
                </Stack>
                {e.description ? (
                  <Stack>
                    <Box
                      sx={{
                        fontSize: "24px",
                      }}
                    >
                      Программы обучения
                    </Box>
                    {e.description
                      .split("⼀")
                      .slice(1)
                      .map((item) => {
                        return <CardText>- {item}</CardText>;
                      })}
                  </Stack>
                ) : null}
              </CardContent>
            </Card>
          ))}
        </Carousel>
      </Stack>
    </Stack>
  );
};

export default Calc;
