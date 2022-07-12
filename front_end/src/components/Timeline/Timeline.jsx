import * as React from "react";
import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Check from "@mui/icons-material/Check";

import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#784af4",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#784af4",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const QontoStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
  display: "flex",
  height: 22,
  alignItems: "center",
  ...(ownerState.active && {
    color: "#784af4",
  }),
  "& .QontoStepIcon-completedIcon": {
    color: "#784af4",
    zIndex: 1,
    fontSize: 18,
  },
  "& .QontoStepIcon-circle": {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
};

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {},
  [`&.${stepConnectorClasses.completed}`]: {},
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 60,
  height: 60,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundImage: "linear-gradient( 136deg, #1976d2 50%,  #00d4ff 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(25,118,210) 0%, rgb(25,118,210) 50%,  rgb(25,118,210) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
}));

export default function Timeline() {
  const DateFormatter = (date) => {
    let user_date = new Date(date);
    const month = [
      "Января",
      "Февраля",
      "Марта",
      "Апреля",
      "Мая",
      "Июня",
      "Июля",
      "Августа",
      "Сентября",
      "Октября",
      "Ноября",
      "Декабря",
    ];
    return (
      <Box>
        {user_date.getDate()} <br />
        {month[user_date.getMonth()].toLowerCase()}
      </Box>
    );
  };

  const activeStepFinder = (events) => {
    let current;
    events.map((item, index) => {
      let date = new Date(item.date);
      let actual_date = new Date();
      if (actual_date >= date) {
        current = index;
      }
    });
    return current + 1;
  };

  const [step, setStep] = useState(0);
  const [extamural, setExtamural] = useState([]);
  const [intamural, setIntamural] = useState([]);

  // const fetchDataIn = async () => {
  //   const response = await fetch(`/api/v1/in-event`);
  //   const data = await response.json();
  //   console.log(response, data)
  //   setIntamural(data);
  // };
  // const fetchDataEx = async () => {
  //   const response = await fetch(`/api/v1/ex-event`);
  //   const data = await response.json();
    
  //   setExtamural(data);
  // };
    // Get exams from API
    const fetchData = async (url) => {
      const response = await fetch(`/api/v1${url}`);
      const data = await response.json();
      return data;
    };

  useEffect(() => {
    // fetchDataIn();
    // fetchDataEx();
    fetchData('/in-event/').then((data) => {
      setIntamural(data);
    });
    fetchData('/ex-event/').then((data) => {
      setExtamural(data);
    });

  
  }, []);

  function ColorlibStepIcon(props) {
    const { active, completed, className } = props;

    const icons = Object.keys(intamural).map((key) => {
      return (
        <Box
          sx={{
            textAlign: "center",
          }}
        >
          {DateFormatter(intamural[key].date)}
        </Box>
      );
    });
    return (
      <ColorlibStepIconRoot
        ownerState={{ completed, active }}
        className={className}
      >
        {icons[String(props.icon) - 1]}
      </ColorlibStepIconRoot>
    );
  }

  ColorlibStepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
    /**
     * The label displayed in the step icon.
     */
    icon: PropTypes.node,
  };

  return (
    <Stack
      sx={{
        minHeight: "100vh",
        gap: "30px",
      }}
      id={"idu"}
    >
      <Stack>
        <Box
          sx={{
            fontSize: "28px",
            maxWidth: "60%",
            ["@media(max-width:984px)"]: {
              maxWidth: "100%",
            },
          }}
        >
          Этапы приёмной комиссии очной формы обучения
        </Box>
        <Stepper
          sx={{
            width: "100%",
            marginTop: "30px",
            overflowX: "scroll",
            OverflowStyle: "none",
            "&::-webkit-scrollbar": {
              width: "10px",
              height: "7px",
            },
            "&::-webkit-scrollbar-track": {
              background: "white",
              borderRadius: "50px",
              border: "1px solid rgb(25,118,210)",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgb(25,118,210)",
              borderRadius: "50px",
            },
          }}
          alternativeLabel
          activeStep={activeStepFinder(intamural)}
          connector={<ColorlibConnector />}
        >
          {Object.keys(intamural).map((key) => (
            <Step key={intamural[key].id}>
              <StepLabel StepIconComponent={ColorlibStepIcon}>
                <Box
                  sx={{
                    minWidth: "120px",
                  }}
                >
                  {intamural[key].text}
                </Box>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Stack>
      <Stack>
        <Box
          sx={{
            fontSize: "28px",
            maxWidth: "60%",
            ["@media(max-width:984px)"]: {
              maxWidth: "100%",
            },
          }}
        >
          Этапы приёмной комиссии заочной формы обучения
        </Box>
        <Stepper
          sx={{
            width: "100%",
            marginTop: "30px",
            overflowX: "scroll",
            OverflowStyle: "none",
            "&::-webkit-scrollbar": {
              width: "10px",
              height: "7px",
            },
            "&::-webkit-scrollbar-track": {
              background: "white",
              borderRadius: "50px",
              border: "1px solid rgb(25,118,210)",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgb(25,118,210)",
              borderRadius: "50px",
            },
          }}
          alternativeLabel
          activeStep={activeStepFinder(extamural)}
          connector={<ColorlibConnector />}
        >
          {Object.keys(extamural).map((key) => (
            <Step key={extamural[key].id}>
              <StepLabel StepIconComponent={ColorlibStepIcon}>
                <Box
                  sx={{
                    minWidth: "120px",
                  }}
                >
                  {extamural[key].text}
                </Box>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Stack>
    </Stack>
  );
}
