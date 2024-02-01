"on client";
import styles from "./LawyerTaskDetails.module.css";
import Image from "next/image";
import clockIcon from "@/public/clockIcon.svg";
import userIcon from "@/public/userIcon.svg";
import arrowLeftIcon from "@/public/arrowLeftIcon.svg";
import { useState, useEffect, useRef } from "react";
import putTaskTitle from "@/utils/API/putTaskTitle";
import putTaskDescription from "@/utils/API/putTaskDescription";
import putTaskDeadline from "@/utils/API/putTaskDeadline";
import putTaskResponsibleLawyer from "@/utils/API/putTaskResponsibleLawyer";

export default function LawyerTaskDetails({
  lawyerID,
  selectedTask,
  setSelectedTask,
}) {

  const [taskTitle, setTaskTitle] = useState(
    selectedTask && selectedTask.title
  );
  const [taskDescription, setTaskDescription] = useState(
    selectedTask && selectedTask.description
  );
  const [taskDeadline, setTaskDeadline] = useState(selectedTask && selectedTask.deadline &&
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
    const prevSelectedTaskRef = useRef();
    // SOMENTE RODAR O USEEFFECT DE RENDERIZAÇÃO INICIAL DOS STATES COM A CONDIÇÃO DO ANTERIOR SER NULL SENAO TRAVA TUDO AO ATUALIZ
    //AR AS VARIAVEIS NOS INPUTS
  useEffect(() => {
    if(prevSelectedTaskRef.current === null && selectedTask){
      setTaskTitle(selectedTask && selectedTask.title);
      setTaskDescription(selectedTask && selectedTask.description);
      setTaskDeadline(
        selectedTask && selectedTask.deadline &&
          selectedTask.deadline.split("-")[2] +
            "/" +
            selectedTask.deadline.split("-")[1] +
            "/" +
            selectedTask.deadline.split("-")[0]
      );
      setTaskResponsibleLawyerID(selectedTask && selectedTask.responsibleLawyerID && selectedTask.responsibleLawyerID.id)
      }
      prevSelectedTaskRef.current = selectedTask
  }, [selectedTask]);

  useEffect(() => {
    if(selectedTask){
      putTaskTitle(selectedTask.id, taskTitle);
      setSelectedTask(selectedTask=>{return {...selectedTask, title: taskTitle}})
    }
  }, [taskTitle]);

  useEffect(() => {
    if (selectedTask) {
      console.log("vai atualizar a descrição da tarefa")
      putTaskDescription(selectedTask.id, taskDescription);
      console.log("Atualizou a descrição da tarefa")
      console.log("Vai atualizar a tarefa selecionado no front end agora")
      setSelectedTask(selectedTask=>{return {...selectedTask, description: taskDescription}})
    }
  }, [taskDescription]);

  useEffect(() => {
    if (selectedTask) {
      console.log("O taskResponsibleLawyerID é: ", taskResponsibleLawyerID)
      putTaskResponsibleLawyer(selectedTask.id, taskResponsibleLawyerID);
      setSelectedTask(selectedTask=>{return {...selectedTask, responsibleLawyerID: {id: taskResponsibleLawyerID}}})
    }
  }, [taskResponsibleLawyerID]);
  // useEffect(() => {
  //   if (selectedTask && selectedTask.id !== taskResponsibleLawyerID) {
  //     console.log("O taskResponsibleLawyerID é: ", taskResponsibleLawyerID);
  //     putTaskResponsibleLawyer(selectedTask.id, taskResponsibleLawyerID);
  
  //     // Atualiza o estado de maneira mais segura
  //     setSelectedTask(previousSelectedTask => ({
  //       ...previousSelectedTask,
  //       responsibleLawyerID: { id: taskResponsibleLawyerID }
  //     }));
  //   }
  // }, [taskResponsibleLawyerID]);


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
          {selectedTask && selectedTask.lawyers &&
            selectedTask.lawyers.map((lawyer) => (
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
