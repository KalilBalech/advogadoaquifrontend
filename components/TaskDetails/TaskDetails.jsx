"on client";
import styles from "./TaskDetails.module.css";
import Image from "next/image";
import clockIcon from "@/public/clockIcon.svg";
import userIcon from "@/public/userIcon.svg";
import arrowLeftIcon from "@/public/arrowLeftIcon.svg";
import { useState, useEffect } from "react";
import putTaskTitle from "@/utils/API/putTaskTitle";
import putTaskDescription from "@/utils/API/putTaskDescription";
import putTaskDeadline from "@/utils/API/putTaskDeadline";
import putTaskResponsibleLawyer from "@/utils/API/putTaskResponsibleLawyer";

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
  const [taskDeadline, setTaskDeadline] = useState(selectedTask &&
    selectedTask.deadline.split("-")[2] +
    "/" +
    selectedTask.deadline.split("-")[1] +
    "/" +
    selectedTask.deadline.split("-")[0]
    );
    const [taskResponsibleLawyerID, setTaskResponsibleLawyerID] = useState(
      selectedTask && selectedTask.responsibleLawyerID && selectedTask.responsibleLawyerID.id
      );

    const [taskDeadlineWasUpdated, setTaskDeadlineWasUpdated] = useState(false)
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
    setTaskResponsibleLawyerID(selectedTask && selectedTask.responsibleLawyerID && selectedTask.responsibleLawyerID.id)
  }, [selectedTask]);

  useEffect(() => {
    if(selectedTask){
      putTaskTitle(selectedTask.id, taskTitle);
      setSelectedTask(selectedTask=>{return {...selectedTask, title: taskTitle}})
    }
  }, [taskTitle]);

  useEffect(() => {
    if (selectedTask) {
      putTaskDescription(selectedTask.id, taskDescription);
      setSelectedTask(selectedTask=>{return {...selectedTask, description: taskDescription}})
    }
  }, [taskDescription]);

  useEffect(() => {
    if (selectedTask) {
      putTaskResponsibleLawyer(selectedTask.id, taskResponsibleLawyerID);
      setSelectedTask(selectedTask=>{return {...selectedTask, responsibleLawyerID: {id: taskResponsibleLawyerID}}})
    }
  }, [taskResponsibleLawyerID]);


  useEffect(() => {
    if (
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
        console.log("A deadline vai ser atualizada com o valor: ", dataBaseDeadlineValue);
        putTaskDeadline(selectedTask.id, dataBaseDeadlineValue);
    }
  }, [taskDeadline]);

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
        <label>Responsável:</label>
        <select id="lawyers" name="lawyers" value={taskResponsibleLawyerID ? taskResponsibleLawyerID : ''} className={styles.selectLawyer} onChange={(e)=>{setTaskResponsibleLawyerID(e.target.value)}}>
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
