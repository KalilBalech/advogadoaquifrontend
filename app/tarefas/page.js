"use client";
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import HeaderPersonal from "@/components/HeaderPersonal/HeaderPersonal";
import SearchBar from "@/components/SearchBar/SearchBar";
import { useRouter } from "next/navigation";
import getLawyerTasks from "@/utils/API/getLawyerTasks"
import verifyToken from "@/utils/API/verifyToken";
import LawyerTasks from "@/components/LawyerTasks/LawyerTasks"
import LawyerTaskDetails from "@/components/LawyerTaskDetails/LawyerTaskDetails"
import decodeToken from "@/utils/decodeToken";

export default function CustomersTab() {
  const router = useRouter();
  const [tasks, setTasks] = useState([])
  const [selectedTask, setSelectedTask] = useState(null)
  
  // ATUALIZA A ARVORE DE INFORMAÇÕES NO FRONT
  useEffect(()=>{
    if (selectedTask) {
      console.log("O selectedTask foi atualizado: ", selectedTask)
      const updatedTasks = tasks.map(taskItem => 
        taskItem.id === selectedTask.id ? selectedTask : taskItem
      );
      setTasks(updatedTasks);
      console.log("O LawyerTasks foi alterado porque o selectedTask foi alterado")
    }

  }, [selectedTask])
  
  useEffect(() => {
    async function verifyTokenAndGetCustomers() {
      try {
          await verifyToken();
          const lawyerTasks = await getLawyerTasks();
          setTasks(lawyerTasks);
      } catch (error) {
          // Qualquer erro em verifyToken ou getLawyerCases será tratado aqui
          console.error("Error: ", error);
          router.push("/"); // Redirecionar ou tratar o erro conforme necessário
      }
  }
  verifyTokenAndGetCustomers();
  }, []);

  return (
    <body className={`${styles.body} ${selectedTask ? styles.blockScroll : ''}`}>
      <HeaderPersonal></HeaderPersonal>
      <div className={styles.content}>
        {/* <SearchBar setModel={setCustomers} model='customer'></SearchBar> */}
        <LawyerTasks tasks={tasks} setTasks={setTasks} ownerID = {decodeToken(localStorage.getItem('token'))} selectedTask={selectedTask} setSelectedTask={setSelectedTask}/>
        <LawyerTaskDetails lawyerID = {decodeToken(localStorage.getItem('token'))} selectedTask={selectedTask} setSelectedTask={setSelectedTask}/>
      </div>
    </body>
  );
}
