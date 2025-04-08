import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Footer from './Footer'

describe('Footer component', () => {
  test('renders correctly with correct contents displayed', () => {
    render(<Footer />);
    expect(screen.getByText('Made with ♡ in Melbourne.')).toBeInTheDocument();
    expect(screen.getByText('© 2016 Broccoli & Co. All rights reserved.')).toBeInTheDocument();
  });
});