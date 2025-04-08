import styles from './Header.module.scss'
import clsx from 'clsx'

const Header = () => {
  return (
    <div className={clsx(styles.header)}>
      <div className={clsx(styles['header__wrapper'])}>
        <div className={clsx(styles['header__title'])}>
          Broccoli & Co
        </div>
      </div>
    </div>
  )
}

export default Header