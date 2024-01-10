import styles from './page.module.css'
import Header from '@/components/Header/Header'
import Image from 'next/image'

export default function Home() {
  return (
      <body>
        <Header/>
        <div className={styles.mainWindow}>
          <div className={styles.leftWindow}>
            <h1>Tecnologia de verdade para escritórios de advocacia</h1>
            <p>Te damos mais produtividade. Com mais produtividade você coloca mais dinheiro no bolso.</p>
          </div>
          <div className={styles.rightWindow}>
            <Image className={styles.Image} src='/homePage.png' alt='Escritório de advocacia tecnológico' width={400} height={480}/>
          </div>
        </div>
      </body>
  )
}
