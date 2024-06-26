"use client";
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import HeaderPersonal from "@/components/HeaderPersonal/HeaderPersonal";
import SearchBarCustomerName from "@/components/SearchBarCustomerName/SearchBarCustomerName";
import { useRouter } from "next/navigation";
import CustomerDetailsSideCard from "@/components/CustomerDetailsSideCard/CustomerDetailsSideCard";
import CustomerCard from "@/components/CustomerCard/CustomerCard";
import getLawyerCustomers from "@/utils/API/getLawyerCustomers"
import verifyToken from "@/utils/API/verifyToken";


export default function CustomersTab() {
  const router = useRouter();
  const [customers, setCustomers] = useState([])
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  
  // ATUALIZA A ARVORE DE INFORMAÇÕES NO FRONT
  useEffect(()=>{
    if (selectedCustomer) {
      console.log("O selectedCustomer atualizado: ", selectedCustomer)
      const updatedCustomers = customers.map(customerItem => 
        customerItem.id === selectedCustomer.id ? selectedCustomer : customerItem
      );
      setCustomers(updatedCustomers);
      console.log("O CUSTOMERS foi alterado porque o SELECTEDCUSTOMER foi alterado: ", customers)
    }

  }, [selectedCustomer])
  
  useEffect(() => {
    async function verifyTokenAndGetCustomers() {
      try {
          await verifyToken();
          const lawyerCustomers = await getLawyerCustomers();
          setCustomers(lawyerCustomers);
      } catch (error) {
          // Qualquer erro em verifyToken ou getLawyerCases será tratado aqui
          console.error("Error: ", error);
          router.push("/"); // Redirecionar ou tratar o erro conforme necessário
      }
  }
  verifyTokenAndGetCustomers();
  }, []);

  return (
    <body className={`${styles.body} ${selectedCustomer ? styles.blockScroll : ''}`}>
      <HeaderPersonal></HeaderPersonal>
      <div className={styles.content}>
        <SearchBarCustomerName setCustomers={setCustomers}/>
        <ul>
            {customers.map((customer) => (
              <CustomerCard key={customer.id} customer={customer} setSelectedCustomer={setSelectedCustomer}></CustomerCard>
            ))}
        </ul>
        <CustomerDetailsSideCard selectedCustomer={selectedCustomer} setSelectedCustomer={setSelectedCustomer}></CustomerDetailsSideCard>
      </div>
    </body>
  );
}
