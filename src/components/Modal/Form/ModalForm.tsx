import React, { useState } from 'react'
import { Button, Modal, Input, notification } from 'antd'
import { submitInvitationForm } from '../../../services/invitation'
import clsx from 'clsx'
import styles from './ModalForm.module.scss'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type Props = {
  onClose: () => void,
  onSuccess: () => void
}

type FormData = {
  name: string
  email: string
  emailConfirm: string
}

const ModalForm: React.FC<Props> = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    emailConfirm: ''
  })
  const [errorMessages, setErrorMessages] = useState<FormData>({
    name: '',
    email: '',
    emailConfirm: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isAlreadyValidated, setIsAlreadyValidated] = useState(false)
  const [visibleModal, setVisibleModal] = useState(true)
  const [api, contextHolder] = notification.useNotification()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isAlreadyValidated) {
      clearErrorMessages()
    }

    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const clearErrorMessages = (): void => {
    setErrorMessages({
      name: '',
      email: '',
      emailConfirm: ''
    })
  }

  const validateName = (): boolean => {
    if (formData.name.length < 3) {
      setErrorMessages((prev) => ({
        ...prev,
        name: 'Full name length should be more than 3 letters.'
      }))
      return false
    }

    return true
  }

  const validateEmail = (): boolean => {
    if (!emailRegex.test(formData.email)) {
      setErrorMessages((prev) => ({
        ...prev,
        email: 'Please input using the correct email format'
      }))
      return false
    }

    return true
  }

  const validateEmailConfirm = (): boolean => {
    if (formData.email !== formData.emailConfirm) {
      setErrorMessages((prev) => ({
        ...prev,
        emailConfirm: 'Confirm email is different with the inputted email'
      }))
      return false
    }

    return true
  }

  const validate = (): void => {
    setIsAlreadyValidated(true)
    clearErrorMessages()
    let isValidName = validateName()
    let isValidEmail = validateEmail()
    let isValidEmailConfirm = validateEmailConfirm()
    
    if (isValidName && isValidEmail && isValidEmailConfirm) {
      submit()
    }
  }

  const submit = async (): Promise<void> => {
    setIsLoading(true)
    try {
      await submitInvitationForm(formData)
      onSuccess()
    } catch (err: any) {
      api.error({
        description: err.response?.data?.errorMessage || 'Failed to submit form',
        message: 'Error',
        placement: 'top'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const closeModal = (): void => {
    setVisibleModal(false)
    setTimeout(() => {
      onClose()
    }, 1000)
  }

  return (
    <>
      <Modal
        open={visibleModal}
        footer={[]}
        title="Request an invitation"
        onCancel={closeModal}
      >
        <div className={clsx(styles.modal__form)}>
          <div className={clsx(styles['modal__form-row'])}>
            <Input
              value={formData.name}
              type="text"
              name="name"
              placeholder="Full name"
              status={errorMessages.name ? 'error' : ''}
              onInput={handleChange}
            />
            { errorMessages.name &&
              <div className={styles['modal__error-message']}>
                { errorMessages.name }
              </div>
            }
          </div>
          <div className={clsx(styles['modal__form-row'])}>
            <Input
              value={formData.email}
              type="text"
              name="email"
              placeholder="Email"
              status={errorMessages.email ? 'error' : ''}
              onInput={handleChange}
            />
            { errorMessages.email &&
              <div className={styles['modal__error-message']}>
                { errorMessages.email }
              </div>
            }
          </div>
          <div className={clsx(styles['modal__form-row'])}>
            <Input
              value={formData.emailConfirm}
              type="text"
              name="emailConfirm"
              placeholder="Confirm email"
              status={errorMessages.emailConfirm ? 'error' : ''}
              onInput={handleChange}
            />
            { errorMessages.emailConfirm &&
              <div className={styles['modal__error-message']}>
                { errorMessages.emailConfirm }
              </div>
            }
          </div>
          <Button
            loading={isLoading}
            onClick={validate}
            type="primary"
          >
            { isLoading ? 'Sending, please wait...' : 'Send' }
          </Button>
        </div>
      </Modal>
      { contextHolder }
    </>
  )
}

export default ModalForm