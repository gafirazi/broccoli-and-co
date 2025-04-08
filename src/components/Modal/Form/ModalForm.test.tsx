import { describe, test, vi, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { act } from 'react'
import { submitInvitationForm } from '../../../services/invitation'

import ModalForm from './ModalForm'

vi.mock('../../../services/invitation', () => ({
  submitInvitationForm: vi.fn()
}))

describe('ModalForm', () => {
  const onClose = vi.fn()
  const onSuccess = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('renders correctly with correct contents displayed', () => {
    render(<ModalForm onClose={onClose} onSuccess={onSuccess} />)

    expect(screen.getByPlaceholderText('Full name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Confirm email')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Send' })).toBeInTheDocument()
  })

  describe('validation', () => {
    test('validate name and email', async () => {
      render(<ModalForm onClose={onClose} onSuccess={onSuccess} />)

      fireEvent.click(screen.getByRole('button', { name: 'Send' }))

      expect(await screen.findByText('Full name length should be more than 3 letters.')).toBeInTheDocument()
      expect(await screen.findByText('Please input using the correct email format')).toBeInTheDocument()
    })

    test('validate email confirm', async () => {
      render(<ModalForm onClose={onClose} onSuccess={onSuccess} />)

      fireEvent.input(screen.getByPlaceholderText('Full name'), {
        target: { value: 'Gafirazi Irfandi', name: 'name' }
      })
      fireEvent.input(screen.getByPlaceholderText('Email'), {
        target: { value: 'gafiraziirfandi@gmail.com', name: 'email' }
      })
      fireEvent.input(screen.getByPlaceholderText('Confirm email'), {
        target: { value: 'irfandigafirazi@gmail.com', name: 'emailConfirm' }
      })

      fireEvent.click(screen.getByRole('button', { name: 'Send' }))

      expect(await screen.findByText('Confirm email is different with the inputted email')).toBeInTheDocument()
    })

    test('clear validation', async () => {
      render(<ModalForm onClose={onClose} onSuccess={onSuccess} />)

      fireEvent.click(screen.getByRole('button', { name: 'Send' }))

      fireEvent.input(screen.getByPlaceholderText('Full name'), {
        target: { value: 'Gafirazi Irfandi', name: 'name' }
      })
      fireEvent.input(screen.getByPlaceholderText('Email'), {
        target: { value: 'gafiraziirfandi@gmail.com', name: 'email' }
      })
      fireEvent.input(screen.getByPlaceholderText('Confirm email'), {
        target: { value: 'irfandigafirazi@gmail.com', name: 'emailConfirm' }
      })

      await waitFor(() => {
        expect(screen.queryByText('Full name length should be more than 3 letters.')).not.toBeInTheDocument()
        expect(screen.queryByText('Please input using the correct email format')).not.toBeInTheDocument()
        expect(screen.queryByText('Confirm email is different with the inputted email')).not.toBeInTheDocument()
      })
    })
  })

  describe('submit invitation form', () => {
    test('submit invitation form with valid input', async () => {
      (submitInvitationForm as any).mockResolvedValue({})
  
      render(<ModalForm onClose={onClose} onSuccess={onSuccess} />)
  
      fireEvent.input(screen.getByPlaceholderText('Full name'), {
        target: { value: 'Gafirazi Irfandi', name: 'name' }
      })
      fireEvent.input(screen.getByPlaceholderText('Email'), {
        target: { value: 'gafiraziirfandi@gmail.com', name: 'email' }
      })
      fireEvent.input(screen.getByPlaceholderText('Confirm email'), {
        target: { value: 'gafiraziirfandi@gmail.com', name: 'emailConfirm' }
      })
  
      fireEvent.click(screen.getByRole('button', { name: 'Send' }))
  
      await waitFor(() => {
        expect(submitInvitationForm).toHaveBeenCalledWith({
          name: 'Gafirazi Irfandi',
          email: 'gafiraziirfandi@gmail.com',
          emailConfirm: 'gafiraziirfandi@gmail.com'
        })
        expect(onSuccess).toHaveBeenCalled()
      })
    })
  
    test('submit invitation form with known error response structure', async () => {
      (submitInvitationForm as any).mockRejectedValue({
        response: { data: { errorMessage: 'Internal server error' } }
      })
  
      render(<ModalForm onClose={onClose} onSuccess={onSuccess} />)
  
      fireEvent.input(screen.getByPlaceholderText('Full name'), {
        target: { value: 'Gafirazi Irfandi' }
      })
      fireEvent.input(screen.getByPlaceholderText('Email'), {
        target: { value: 'gafiraziirfandi@gmail.com' }
      })
      fireEvent.input(screen.getByPlaceholderText('Confirm email'), {
        target: { value: 'gafiraziirfandi@gmail.com' }
      })
  
      fireEvent.click(screen.getByRole('button', { name: 'Send' }))
  
      await waitFor(() => {
        expect(submitInvitationForm).toHaveBeenCalled()
        expect(onSuccess).not.toHaveBeenCalled()
      })
    })
    
    test('submit invitation form with unknown error response structure', async () => {
      (submitInvitationForm as any).mockRejectedValue({
        response: { data: { error: 'Internal server error' } }
      })
  
      render(<ModalForm onClose={onClose} onSuccess={onSuccess} />)
  
      fireEvent.input(screen.getByPlaceholderText('Full name'), {
        target: { value: 'Gafirazi Irfandi' }
      })
      fireEvent.input(screen.getByPlaceholderText('Email'), {
        target: { value: 'gafiraziirfandi@gmail.com' }
      })
      fireEvent.input(screen.getByPlaceholderText('Confirm email'), {
        target: { value: 'gafiraziirfandi@gmail.com' }
      })
  
      fireEvent.click(screen.getByRole('button', { name: 'Send' }))
  
      await waitFor(() => {
        expect(submitInvitationForm).toHaveBeenCalled()
        expect(onSuccess).not.toHaveBeenCalled()
      })
    })
  })

  test('closes modal and calls onClose', async () => {
    vi.useFakeTimers()
    const onClose = vi.fn()
    const onSuccess = vi.fn()
  
    render(<ModalForm onClose={onClose} onSuccess={onSuccess} />)
  
    const closeButton = screen.getByLabelText('Close')
    fireEvent.click(closeButton)
  
    act(() => {
      vi.advanceTimersByTime(1100)
    })
    expect(onClose).toHaveBeenCalled()
    vi.useRealTimers()
  })
})
