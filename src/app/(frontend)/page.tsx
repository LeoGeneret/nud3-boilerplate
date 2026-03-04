import Image from 'next/image'
import css from './page.module.scss'

export default function Home() {
  return (
    <div className={css.page}>
      <main className={css.main}>
        <div className={css.intro}>
          <h1>[NUD3] Boilerplate</h1>
          <p>
            Launch <code>npx create-payload-app</code> to install Payload
          </p>
        </div>
      </main>
    </div>
  )
}
