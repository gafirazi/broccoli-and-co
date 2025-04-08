import { describe, test, vi, expect, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ModalSuccess from './ModalSuccess'

describe('ModalSuccess', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  test('renders correctly with correct contents displayed', () => {
    const mockClose = vi.fn()

    render(<ModalSuccess onClose={mockClose} />)

    expect(screen.getByText('All done!')).toBeInTheDocument()
    expect(
      screen.getByText('You will be one of the first to experience Broccoli & Co. when we launch.')
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'OK' })).toBeInTheDocument()
  })

  test('closes the modal', () => {
    const mockClose = vi.fn()
    render(<ModalSuccess onClose={mockClose} />)

    const button = screen.getByRole('button', { name: 'OK' })
    fireEvent.click(button)

    vi.runAllTimers()
    expect(mockClose).toHaveBeenCalled()
  })
})
