"on client";
import styles from "./TaskDetails.module.css";
import Image from "next/image";
import clockIcon from "@/public/clockIcon.svg";
import userIcon from "@/public/userIcon.svg";
import arrowLeftIcon from "@/public/arrowLeftIcon.svg";
import { useState, useRef, useEffect } from "react";
import axios from "axios";

export default function TaskDetails({
  selectedCase,
  selectedTask,
  setSelectedTask,
}) {
  const [taskTitle, setTaskTitle] = useState(
    selectedTask && selectedTask.title
  );
  const [taskDescription, setTaskDescription] = useState(
    selectedTask && selectedTask.description
  );
  const [taskDeadline, setTaskDeadline] = useState(
    selectedTask &&
      selectedTask.deadline.split("-")[2] +
        "/" +
        selectedTask.deadline.split("-")[1] +
        "/" +
        selectedTask.deadline.split("-")[0]
  );

  const hasPageBeenRendered = useRef({
    effect1: false,
    effect2: false,
    effect3: false,
  });

  const BASE_URL = process.env.BASE_URL;
  const token = localStorage.getItem("token");
  const headers = {
    Accept: "*/*",
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };

  console.log("taskDeadline: ", taskDeadline && taskDeadline);
  console.log("typeof taskDeadline: ", taskDeadline && typeof taskDeadline);

  const updateTaskTitle = () => {
    let nameData = { title: taskTitle };
    axios
      .put(`${BASE_URL}/task/${selectedTask && selectedTask.id}/`, nameData, {
        headers: headers,
      })
      .then((response) => {
        console.log("O TASK TITLE FOI ATUALIZADO para ", taskTitle);
        console.log("response: ", response);
        selectedTask.name = taskTitle;
      })
      .catch((error) => {
        console.log("ERRO AO ATUALIZAR CASE NAME", error);
      });
  };

  useEffect(() => {
    if (hasPageBeenRendered.current["effect1"] && selectedTask && taskTitle) {
      updateTaskTitle();
    } else {
      hasPageBeenRendered.current["effect1"] = true;
    }
  }, [taskTitle]);

  const updateTaskDescription = () => {
    let nameData = { description: taskDescription };
    axios
      .put(`${BASE_URL}/task/${selectedTask && selectedTask.id}/`, nameData, {
        headers: headers,
      })
      .then((response) => {
        console.log("O TASK DESCRIPTION FOI ATUALIZADO para ", taskDescription);
        console.log("response: ", response);
        selectedTask.description = taskDescription;
      })
      .catch((error) => {
        console.log("ERRO AO ATUALIZAR TASK DESCRIPTION", error);
      });
  };

  useEffect(() => {
    if (
      hasPageBeenRendered.current["effect2"] &&
      selectedTask &&
      taskDescription
    ) {
      updateTaskDescription();
    } else {
      hasPageBeenRendered.current["effect2"] = true;
    }
  }, [taskDescription]);

  const updateTaskDeadline = (dataBaseDeadlineValue) => {
    console.log("VAI ATUALIZER A DATA @@@@@@@@@@@: ", dataBaseDeadlineValue);
    let taskDeadlineData = { deadline: dataBaseDeadlineValue };
    axios
      .put(
        `${BASE_URL}/task/${selectedTask && selectedTask.id}/`,
        taskDeadlineData,
        {
          headers: headers,
        }
      )
      .then((response) => {
        console.log(
          "O TASK DEADLINE FOI ATUALIZADO para ",
          dataBaseDeadlineValue
        );
        console.log("response: ", response);
        selectedTask.deadline = dataBaseDeadlineValue;
      })
      .catch((error) => {
        console.log("ERRO AO ATUALIZAR TASK DEADLINE", error);
      });
  };

  useEffect(() => {
    if (
      hasPageBeenRendered.current["effect3"] &&
      selectedTask &&
      taskDeadline &&
      taskDeadline.length == 10 &&
      taskDeadline.split("/").length == 3 &&
      taskDeadline.split("/")[0].length == 2 &&
      taskDeadline.split("/")[1].length == 2 &&
      taskDeadline.split("/")[2].length == 4
    ) {
      let dataBaseDeadlineValue =
        taskDeadline.split("/")[2] +
        "-" +
        taskDeadline.split("/")[1] +
        "-" +
        taskDeadline.split("/")[0];
      updateTaskDeadline(dataBaseDeadlineValue);
    } else {
      hasPageBeenRendered.current["effect3"] = true;
    }
    console.log("taskDeadline: ", taskDeadline);
  }, [taskDeadline]);

  useEffect(() => {
    setTaskTitle(selectedTask && selectedTask.title);
    setTaskDescription(selectedTask && selectedTask.description);
    setTaskDeadline(
      selectedTask &&
        selectedTask.deadline.split("-")[2] +
          "/" +
          selectedTask.deadline.split("-")[1] +
          "/" +
          selectedTask.deadline.split("-")[0]
    );
  }, [selectedTask]);

  const handleDateInputOnChange = (newDateInput) => {
    let lastChar = newDateInput[newDateInput.length - 1];
    switch (newDateInput.length) {
      case 0:
        setTaskDeadline(newDateInput);
        break;
      case 1:
        if (newDateInput.match(/^\d+$/) !== null) {
          setTaskDeadline(newDateInput);
        }
        break;
      case 2:
        if (lastChar.match(/^\d$/)) {
          setTaskDeadline(newDateInput);
        }
        break;
      case 3:
        if (lastChar.match(/^\d$/)) {
          newDateInput = newDateInput.substring(0, 2) + "/" + lastChar;
          setTaskDeadline(newDateInput);
        } else if (lastChar == "/") {
          setTaskDeadline(newDateInput);
        }
        break;
      case 4:
        if (lastChar.match(/^\d$/) && (lastChar == "0" || lastChar == "1")) {
          setTaskDeadline(newDateInput);
        }
        break;
      case 5:
        if (lastChar.match(/^\d$/)) {
          setTaskDeadline(newDateInput);
        }
        break;
      case 6:
        if (lastChar.match(/^\d$/)) {
          newDateInput = newDateInput.substring(0, 5) + "/" + lastChar;
          setTaskDeadline(newDateInput);
        } else if (lastChar == "/") {
          setTaskDeadline(newDateInput);
        }
        break;
      case 7:
        if (lastChar.match(/^\d$/)) {
          setTaskDeadline(newDateInput);
        }
        break;
      case 8:
        if (lastChar.match(/^\d$/)) {
          setTaskDeadline(newDateInput);
        }
        break;
      case 9:
        if (lastChar.match(/^\d$/)) {
          setTaskDeadline(newDateInput);
        }
        break;
      case 10:
        if (lastChar.match(/^\d$/)) {
          setTaskDeadline(newDateInput);
        }
        break;
    }
  };

  const editResponsibleLawyer = (lawyerID) => {
    console.log('lawyerID', lawyerID);
    let emptyReqData = {};
    axios
      .put(`${BASE_URL}/task/${selectedTask && selectedTask.id}/responsibleLawyer/${lawyerID}/`, emptyReqData, {
        headers: headers,
      })
      .then((response) => {
        console.log("O TASK RESPONSIBLE LAWYER FOI ALTERADO COM SUCESSO ", response);
        console.log("response: ", response);
        selectedTask.responsibleLawyerID.id = lawyerID;
      })
      .catch((error) => {
        console.log("ERRO AO ATUALIZAR TASK RESPONSIBLE LAWYER", error);
      });
  }

  return (
    <div
      className={`${styles.taskDetailsDiv} ${
        selectedTask ? styles.displayBlock : ""
      }`}
    >
      <div className={styles.taskDetailsHeader}>
        <button
          className={styles.arrowLeftIcon}
          onClick={() => setSelectedTask(null)}
        >
          <Image
            alt="arrowLeftIcon"
            src={arrowLeftIcon}
            width={50}
            height={50}
          />
        </button>
        <input
          type="text"
          className={styles.taskTitleInput}
          value={taskTitle ? taskTitle : ""}
          onChange={(e) => {
            setTaskTitle(e.target.value);
          }}
        />
      </div>
      <div className={styles.taskDetailsIconAndInfo}>
        <Image alt="clockIcon" src={clockIcon} width={50} height={50} />
        <input
          type="text"
          className={styles.taskDetailDeadlineInput}
          placeholder="dd/mm/yyyy"
          value={taskDeadline ? taskDeadline : ""}
          onChange={(e) => {
            handleDateInputOnChange(e.target.value);
          }}
        />
      </div>
      <div className={styles.taskDetailsIconAndInfo}>
        <Image alt="userIcon" src={userIcon} width={50} height={50} />
        <label for="lawyers">Responsável:</label>
        <select id="lawyers" name="lawyers" className={styles.selectLawyer} onChange={(e)=>{editResponsibleLawyer(e.target.value)}}>
          {selectedCase &&
            selectedCase.lawyers.map((lawyer) => (
              <option key={lawyer.id} value={lawyer.id} className={styles.responsibleLawyerOption}>
                {lawyer.name}
              </option>
            ))}
        </select>
      </div>
      <textarea
        rows={5}
        value={taskDescription ? taskDescription : ""}
        onChange={(e) => {
          setTaskDescription(e.target.value);
        }}
        className={styles.taskDescriptionInput}
      />
    </div>
  );
}
