import { render, screen } from '@testing-library/react'
import { describe, test, expect } from 'vitest'

import App from './App'

describe('App', () => {
  test('renders correctly with correct contents displayed', () => {
    render(<App />)
    expect(screen.getByText('A better way to enjoy every day.')).toBeInTheDocument()
  })
})