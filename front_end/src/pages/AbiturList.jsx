import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import MenuIcon from "@mui/icons-material/Menu";
import { Modal } from "@mui/material";
import { Link } from "react-router-dom";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import MyLoader from "../components/Loader/Loader";

const Menu = styled.div`
  display: none;
  margin-right: 30px;
  @media (max-width: 1200px) {
    display: flex;
  }
`;

const NavItem = styled.a`
  fontfamily: "Roboto";
  text-decoration: none;
  color: #434b4d;
  font-size: 18px;
  &:hover {
    color: rgb(25 118 210);
  }
`;

function AbiturList() {
  const [filters, setFiltres] = useState([]); // получаемые параметры для селектов
  const [keys, setKeys] = useState([]); // Ключи селектов
  const [list, setList] = useState([]); // Список полученных студентов
  const [listLoader, setListLoader] = useState(false); //лоадер списка студентов
  const [tableHeadLoader, setTableHeadLoader] = useState(false); //лоадер шапки таблицы (не видим)
  const [isLoading, setIsLoading] = useState(true); // лоадер страницы
  const [params, setParams] = useState([]); // шапка для таблицы
  const [open, setOpen] = useState(false); // открывашка модалки

  //переменные состояния для селектов
  const [spec, setSpeciality] = useState([]);
  const [level, setEduLevel] = useState([]);
  const [form, setForm] = useState([]);
  const [fin, setFinance] = useState([]);
  const [doc, setDoctype] = useState(0);
  const [soglas, setSoglasie] = useState(0);

  let speciality = setSpeciality;

  let edu_level = setEduLevel;

  let edu_form = setForm;

  let finance = setFinance;

  let docs = setDoctype;

  let sogl = setSoglasie;

  var SelectHooks = [speciality, edu_level, edu_form, finance];

  var SelectStates = [spec, level, form, fin, doc];

  // Универсальная функция для API
  const fetchData = async (url) => {
    const response = await fetch(`/api/v1/abitur${url}`);
    const data = await response.json();

    return data;
  };

  // Процессы при загрузке, работа лоадера
  useEffect(() => {
    fetchData("/get_parameters/").then((data) => {
      setFiltres(data);
      setKeys(Object.keys(filters));
      setIsLoading(false);
    });
  }, []);

  //Формирование урла для запроса чтоб взять абитуриентов
  let abiturSearchUrl;
  const urlConstructor = (spec, level, form, fin, doc, soglas) => {
    switch (doc) {
      case true:
        doc = 1;
        break;
      case false:
        doc = 0;
        break;
    }
    switch (soglas) {
      case true:
        soglas = 1;
        break;
      case false:
        soglas = 0;
        break;
    }

    let flag = 0;
    let eduLvl = {
      "Академический бакалавр": "bak",
      Магистр: "mag",
      Специалист: "spec",
      Аспирантура: "asp",
    };

    if (level.length > 0) {
      abiturSearchUrl = `/${eduLvl[level]}_short/?`;
      if (spec.length > 0) {
        abiturSearchUrl += `speciality=${spec}&`;
      } else {
        flag = 1;
        alert("Укажите специальность");
      }
      if (form.length > 0) {
        abiturSearchUrl += `edu_form=${form}&`;
      } else {
        flag = 1;
        alert("Укажите форму обучения");
      }
      if (fin.length > 0) {
        abiturSearchUrl += `finance=${fin}&`;
      } else {
        flag = 1;
        alert("Укажите основу обучения");
      }
      if (doc) {
        abiturSearchUrl += `doc_type=${filters.doc_type[doc]}&`;
      }
      if (soglas) {
        abiturSearchUrl += `soglasie=${filters.soglasie[soglas]}&`;
      }
    } else {
      flag = 1;
      alert("Укажите уровень образования");
    }

    if (flag) {
      abiturSearchUrl = undefined;
    }
    return abiturSearchUrl;
  };

  //Запрос чтобы забрать абитуриаентов
  const AbiturGet = (url) => {
    fetchData(url)
      .then((data) => {
        setList(data);
      })
      .then(() => setListLoader(false))
      .catch(() => {
        setListLoader(false);
      });
  };

  // Запрос, чтобы забрать параметры для таблицы абитуриентов
  const AbiturParamGet = (abiturSearchUrl) => {
    setParams([]);
    let abiturParamUrl = `/par_${abiturSearchUrl.slice(1)}`;
    // console.log(abiturParamUrl);
    fetchData(abiturParamUrl).then((data) => setParams(data));
  };

  // Функция для поиска внутри списка
  const Search = (value) => {
    if (list.length > 0) {
      for (let index in list) {
        let toColor = document.getElementById(index);
        toColor.style.backgroundColor = "white";
      }

      if (value) {
        let fund = list.filter((li) => li.code.includes(value));
        let index = list.indexOf(fund[0]);
        let toColor = document.getElementById(index);
        toColor.style.backgroundColor = "rgb(190,190,190)";
        if (Number(index) > 1) {
          window.location =
            ("" + window.location).replace(/#[A-Za-z0-9_]*$/, "") +
            `#${Number(index) - 1}`;
        }
        document.getElementById("search").focus();
      } else {
        window.location =
          ("" + window.location).replace(/#[A-Za-z0-9_]*$/, "") + `#`;
        document.getElementById("search").focus();
      }
    } else {
      alert("Выберите конкурсную группу!");
    }
  };

  // Статика для заголовков
  let labelsSelect = {
    speciality: "Специальность",
    edu_level: "Уровень образования",
    edu_form: "Форма обучения",
    finance: "Основа обучения",
  };
  let labelCheckbox = {
    doc_type: "Оригинал документов",
    soglasie: "Наличие согласия на зачисление",
  };

  //Компонента элементов ввода и управления сверху
  const Header = () => {
    return (
      <Box>
        <Stack
          direction={{ xs: "row", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
          sx={{
            backgroundColor: "white",
            justifyContent: "space-between",
            border: "2px  #B5B8B1 solid",
            width: "100%",
            zIndex: "1",
            display: "flex",
            position: "fixed",
            marginLeft: "-40px",
            marginTop: "-10px",
            minHeight: "75px",
          }}
        >
          <Stack
            direction="row"
            sx={{
              gap: "35px",
              ["@media(max-width:1200px)"]: {
                display: "none",
              },
            }}
          >
            <Stack
              sx={{
                alignSelf: "center",
              }}
            >
              <a href="https://www.miigaik.ru/">
                <img
                  style={{
                    height: "70px",
                    filter: " brightness(110%)",
                    marginLeft: "30px",
                  }}
                  src="https://www.miigaik.ru/include/logo3.svg"
                ></img>
              </a>
            </Stack>
            <Stack
              direction="row"
              sx={{
                alignSelf: "center",
                justifySelf: "start",
                gap: "30px",
              }}
            >
              <Stack
                sx={{
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <Link style={{ textDecoration: "none" }} to="/">
                  <Box
                    sx={{
                      color: " #434B4D",
                      fontSize: "18px",
                      "&:hover": {
                        color: " rgb(25 118 210)",
                      },
                    }}
                  >
                    Абитуриенту
                  </Box>
                </Link>
              </Stack>
              <Stack
                sx={{
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <NavItem href=" https://miigaik.ru/Abitur/">
                  Приемная кампания 2022
                </NavItem>
              </Stack>
              <Stack
                sx={{
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <NavItem href=" https://miigaik.ru/Abitur/">
                  Вопрос приёмной комиссии
                </NavItem>
              </Stack>
            </Stack>
          </Stack>
          <Stack
            direction="row"
            sx={{
              alignItems: "center",
              gap: "25px",
              ["@media(max-width:1200px)"]: {
                display: "none",
              },
            }}
          >
            <Stack direction="row" sx={{ alignItems: "center", gap: "5px" }}>
              <MailOutlineIcon />
              <Typography>pk@miigaik.ru</Typography>
            </Stack>
            <Stack
              direction="row"
              sx={{ alignItems: "center", gap: "5px", textAlign: "center" }}
            >
              <LocalPhoneIcon />
              <Typography>+7 (499) 267-15-45</Typography>
            </Stack>
          </Stack>
          <Stack
            direction="row"
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
              zIndex: "100",
              ["@media(max-width:1200px)"]: {
                width: "100%",
              },
            }}
          >
            <Input
              sx={{
                width: "200px",
                backgroundColor: "white",
                padding: "7px",
                marginRight: "30px",
              }}
              type="search"
              id="search"
              placeholder="Поиск"
              autoComplete="off"
              onChange={(event) => {
                Search(event.target.value);
              }}
            ></Input>
            <Menu
              onClick={() => {
                setOpen(true);
              }}
            >
              <MenuIcon
                sx={{
                  color: " #B5B8B1",
                }}
                fontSize="medium"
              />
            </Menu>
          </Stack>

          <Modal
            open={open}
            onClose={() => {
              setOpen(false);
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={{
                minHeight: "70vh",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "95%",
                bgcolor: "background.paper",
                border: "2px solid #000",
                boxShadow: 24,
              }}
            >
              <Stack
                direction="column"
                sx={{
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "30px",
                  height: "100%",
                }}
              >
                <h1>Меню</h1>
                <Stack>
                  <Stack>
                    <a
                      href=" https://miigaik.ru/"
                      style={{
                        textDecoration: "none",
                        color: " #434B4D",
                        fontSize: "24px",
                      }}
                    >
                      Страница университета
                    </a>
                  </Stack>
                  <Stack
                    sx={{
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "30px",
                    }}
                  >
                    <Link
                      to="/"
                      style={{
                        textDecoration: "none",
                        color: " #434B4D",
                        fontSize: "24px",
                      }}
                    >
                      Абитуриенту
                    </Link>
                  </Stack>
                </Stack>
                <Stack>
                  <a
                    href=" https://miigaik.ru/Abitur/"
                    style={{
                      textDecoration: "none",
                      color: " #434B4D",
                      fontSize: "24px",
                    }}
                  >
                    Приемная кампания 2022
                  </a>
                </Stack>
                <Stack>
                  <a
                    href="https://miigaik.ru/Abitur/question/"
                    style={{
                      textDecoration: "none",
                      color: " #434B4D",
                      fontSize: "24px",
                    }}
                  >
                    Задать вопрос приёмной комиссии
                  </a>
                </Stack>
                <Stack
                  direction="row"
                  sx={{
                    alignItems: "center",
                    gap: "25px",
                  }}
                >
                  <Stack
                    direction="row"
                    sx={{ alignItems: "center", gap: "5px" }}
                  >
                    <MailOutlineIcon />
                    <Typography>pk@miigaik.ru</Typography>
                  </Stack>
                  <Stack
                    direction="row"
                    sx={{ alignItems: "center", gap: "5px" }}
                  >
                    <LocalPhoneIcon />
                    <Typography>+7 (499) 267-15-45</Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Box>
          </Modal>
        </Stack>
        <Box
          sx={{
            width: "100%",
            height: "80px",
            ["@media (max-width: 600px)"]: {
              height: "100px",
            },
          }}
        ></Box>
       <Stack sx={{
        justifyContent:'space-between',
        alignItems:'space-between'
       }}>
       <Typography variant="h4">
          Списки поступающих 
        </Typography>
        <Link to="../abitur-extra/">(Полная версия)</Link>
       </Stack>
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
            flexWrap: "wrap",
            marginTop: "10px",
          }}
        >
          {Object.keys(filters).map((select, index) => {
            if (typeof labelsSelect[select] !== "undefined") {
              // console.log(select);
              return (
                <Stack
                  direction={{ xs: "row", sm: "row" }}
                  spacing={{ xs: 1, sm: 2, md: 4 }}
                >
                  <Box>
                    <InputLabel id={`label-${select}`}>
                      {labelsSelect[select]}
                    </InputLabel>
                    <Select
                      sx={{
                        width: "250px",
                      }}
                      name={select}
                      value={SelectStates[index]}
                      onChange={(e) => SelectHooks[index](e.target.value)}
                    >
                      <MenuItem
                        sx={{
                          zIndex: "100000",
                          width: "80vw",
                        }}
                        disabled
                      >
                        {labelsSelect[select]}
                      </MenuItem>
                      {filters[select].map((option) => (
                        <MenuItem value={option}>{option}</MenuItem>
                      ))}
                    </Select>
                  </Box>
                </Stack>
              );
            }
            if (typeof labelCheckbox[select] !== "undefined") {
              // return (
              //   <div>
              //     <label>{labelCheckbox[select]}</label>
              //     <input
              //       checked={CheckBoxesState[index]}
              //       onChange={() => SelectHooks[index](!CheckBoxesState[index])}
              //       type="checkbox"
              //     />
              //   </div>
              // );
            }
          })}
        </Stack>
        <Stack
          sx={{
            justifyContent: "space-between",
          }}
          direction={{
            xs: "column",
            sm: "row",
            md: "row",
            lg: "row",
            xl: "row",
          }}
        >
          <Stack>
            <Stack
              direction={{ xs: "row", sm: "row" }}
              sx={{ marginTop: "16px", marginBottom: "16px" }}
            >
              <div>Только оригиналы документов</div>
              <input
                checked={doc}
                onChange={() => {
                  setDoctype(!doc);
                }}
                type={"checkbox"}
              ></input>
            </Stack>
            <Stack
              direction={{ xs: "row", sm: "row" }}
              sx={{ marginBottom: "16px" }}
            >
              <div>Только с согласиями на зачисление</div>
              <input
                checked={soglas}
                onChange={() => {
                  setSoglasie(!soglas);
                }}
                type={"checkbox"}
              ></input>
            </Stack>

            <Button
              sx={{ width: "250px" }}
              variant="outlined"
              onClick={() => {
                setList([]);
                urlConstructor(spec, level, form, fin, doc, soglas);
                if (abiturSearchUrl) {
                  AbiturGet(abiturSearchUrl);
                  AbiturParamGet(abiturSearchUrl);
                  setListLoader(true);
                }
                // alert(abiturSearchUrl);
              }}
            >
              НАЙТИ
            </Button>
          </Stack>
        </Stack>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        paddingLeft: "30px",
        paddingRight: "30px",
      }}
    >
      {isLoading ? (
        <MyLoader />
      ) : (
        <div>
          <Header />
        </div>
      )}
      <div>
        {listLoader ? (
          <Stack
            sx={{
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </Stack>
        ) : (
          <Box
            sx={{
              display: "flex",
              overflowX: "scroll",
              "&::-webkit-scrollbar": {
                width: 0,
              },
              justifyContent: "center",
            }}
          >
            <Table
              aria-label="simple table"
              sx={{
                width: "auto",
              }}
            >
              <TableHead>
                <TableRow>
                  {Object.values(params).map((ele) => {
                    return (
                      <TableCell sx={{ width: "auto", textAlign: "center" }}>
                        {ele}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {list.map((item, index) => {
                  return (
                    <TableRow id={index}>
                      <TableCell sx={{ minWidth: "auto", textAlign: "center" }}>
                        {index + 1}
                      </TableCell>
                      {Object.values(item).map((elem) => {
                        return (
                          <TableCell
                            sx={{ width: "120px", textAlign: "center" }}
                          >
                            {elem}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Box>
        )}
      </div>
    </Box>
  );
}

export default AbiturList;
