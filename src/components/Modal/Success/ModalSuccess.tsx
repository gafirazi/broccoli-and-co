import { useState } from 'react'
import { Button, Modal } from 'antd'
import clsx from 'clsx'
import styles from './ModalSuccess.module.scss'

type Props = {
  onClose: () => void
}

const ModalSuccess: React.FC<Props> = ({ onClose }) => {
  const [visibleModal, setVisibleModal] = useState(true)

  const closeModal = (): void => {
    setVisibleModal(false)
    setTimeout(() => {
      onClose()
    }, 1000)
  }

  return (
    <Modal
      open={visibleModal}
      footer={[]}
      title="All done!"
      onCancel={closeModal}
    >
      <div className={clsx(styles.modal__body)}>
        <div>
          You will be one of the first to experience Broccoli & Co. when we launch.
        </div>
        <Button
          onClick={closeModal}
          type="primary"
        >
          OK
        </Button>
      </div>
    </Modal>
  )
}

export default ModalSuccess