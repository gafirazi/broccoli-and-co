import styles from './Footer.module.scss'
import clsx from 'clsx'

const Footer = () => {
  return (
    <div className={clsx(styles.footer)}>
      <div className={clsx(styles['footer__wrapper'])}>
        <div className={clsx(styles['footer__text'])}>
          Made with ♡ in Melbourne.
        </div>
        <div className={clsx(styles['footer__text'])}>
          © 2016 Broccoli & Co. All rights reserved.
        </div>
      </div>
    </div>
  )
}

export default Footer