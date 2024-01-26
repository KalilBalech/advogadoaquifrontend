'use client'
 
import { usePathname } from 'next/navigation'
import HeaderPersonal from "@/components/HeaderPersonal/HeaderPersonal";

export default function Lawyer() {
  const pathname = usePathname()
  return (
  <body>
    <HeaderPersonal></HeaderPersonal>
    <h1>asdf</h1>
    <h1>{pathname}</h1>
    <h1>depos</h1>
  </body>
  );
}
