import { useState } from 'react'
import styles from './Home.module.scss'
import clsx from 'clsx'

import { Button } from 'antd'

import ModalForm from '../../components/Modal/Form/ModalForm'
import ModalSuccess from '../../components/Modal/Success/ModalSuccess'

const Home = () => {
  const [visibleModal, setVisibleModal] = useState(false)
  const [visibleModalSuccess, setVisibleModalSuccess] = useState(false)

  const toggleModal = (): void => {
    setVisibleModal(!visibleModal)
  }

  const toggleModalSuccess = (): void => {
    setVisibleModalSuccess(!visibleModalSuccess)
  }

  const handleSuccess = (): void => {
    toggleModal()
    toggleModalSuccess()
  }

  return (
    <>
      <div className={clsx(styles.home)}>
        <div className={clsx(styles['home__wrapper'])}>
          <div className={clsx(styles['home__title'])}>
            A better way to enjoy every day.
          </div>
          <div className={clsx(styles['home__subtitle'])}>
            Be the first to know we launch
          </div>
          <Button
            type="primary"
            onClick={toggleModal}
          >
            Request an invite
          </Button>
        </div>
      </div>

      { visibleModal &&
        <ModalForm
          onClose={toggleModal}
          onSuccess={handleSuccess}
        />
      }
      { visibleModalSuccess &&
        <ModalSuccess onClose={toggleModalSuccess} />
      }
    </>
  )
}

export default Home