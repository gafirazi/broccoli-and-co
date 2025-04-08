import { describe, test, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor} from '@testing-library/react'
import { submitInvitationForm } from '../../services/invitation'

import Home from './Home'

vi.mock('../../services/invitation', () => ({
  submitInvitationForm: vi.fn()
}))

describe('Home component', () => {
  test('renders correctly with correct contents displayed', () => {
    render(<Home />)
    expect(screen.getByText('A better way to enjoy every day.')).toBeInTheDocument()
  })

  describe('toggle ModalForm', () => {
    test('shows ModalForm when button clicked', () => {
      render(<Home />)
      fireEvent.click(screen.getByRole('button', { name: 'Request an invite' }))
      expect(screen.getByText('Request an invitation')).toBeInTheDocument()
    })
  
    test('closes ModalForm when cancel clicked', async () => {
      render(<Home />)
  
      fireEvent.click(screen.getByRole('button', { name: 'Request an invite' }))
  
      const modalTitle = await screen.findByText('Request an invitation')
      expect(modalTitle).toBeInTheDocument()
  
      const closeButton = document.querySelector('.ant-modal-close') as HTMLElement
      fireEvent.click(closeButton)
  
      await waitFor(() => {
        expect(screen.queryByText('Request an invitation')).not.toBeInTheDocument()
      }, { timeout: 1500 })
    })
  })

  test('calls handleSuccess when ModalForm triggers onSuccess', async () => {
    (submitInvitationForm as any).mockResolvedValue({})
    
    render(<Home />)
  
    fireEvent.click(screen.getByRole('button', { name: 'Request an invite' }))
    expect(await screen.findByText('Request an invitation')).toBeInTheDocument()
  
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
  
    expect(await screen.findByText('All done!')).toBeInTheDocument()
  })
})