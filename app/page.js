import styles from './page.module.css'
import Header from '@/components/Header/Header'
import Image from 'next/image'
import homePageImage from '@/public/homePage.png'
import Button from '@/components/Button/Button'

export default function Home() {
  const sendWhatsAppMessage = ()=>{

  }
  return (
      <body>
        <Header/>
        <div className={styles.mainWindow}>
          <div className={styles.leftWindow}>
            <h1>Tecnologia de verdade para escritórios de advocacia</h1>
            <p>Software de automação e inteligência artificial focado em pequenos escritórios de advocacia do estado de São Paulo</p>
            {/* <p>Te damos mais produtividade. Com mais produtividade você coloca mais dinheiro no bolso.</p> */}
          </div>
          <div className={styles.rightWindow}>
            <Image className={styles.Image} src={homePageImage} alt='Escritório de advocacia tecnológico' width={400} height={480} priority/>

          </div>
        </div>
        <div className={styles.contactDiv}>
            <p>Entre em contato conosco para usar nosso software GRATUITAMENTE</p>
            <Button whatsapp={true} text='WhatsApp' onClick={sendWhatsAppMessage()}/>
        </div>
      </body>
  )
}
