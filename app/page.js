import styles from './page.module.css'
import Header from '@/components/Header/Header'
import Image from 'next/image'

export default function Home() {
  return (
      <body>
        <Header/>
        <div className={styles.mainWindow}>
          <div className={styles.leftWindow}>
            <h1>Tecnologia de verdade para escritório de advocacia</h1>
            <p>Tempo é dinheiro: use ambos com sabedoria</p>
          </div>
          <div className={styles.rightWindow}>
            <Image className={styles.Image} src='/homePage.png' alt='Escritório de advocacia tecnológico' width={400} height={480}/>
          </div>
        </div>
      </body>
  )
}
