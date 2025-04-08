import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Header from './Header'

describe('Header component', () => {
  test('renders correctly with correct contents displayed', () => {
    render(<Header />);
    expect(screen.getByText('Broccoli & Co')).toBeInTheDocument();
  });
});