import { Raleway } from 'next/font/google'
 
const raleway = Raleway({
  weight: '400',
  subsets: ['latin'],
})

import './globals.css'
export const metadata = {
  title: 'Advogado AI',
  description: 'Tecnologia para advogados',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        {children}
    </html>
  )
}
