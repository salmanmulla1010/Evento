import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { expect, jest, test } from '@jest/globals'
import Login from './Login'
import { MemoryRouter } from 'react-router-dom'
import '@testing-library/jest-dom/extend-expect'
const { getByLabelText, getByPlaceholderText, getByText, getByRole } = render()

describe('Login Component', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    )
  })
  test('Sign In Present', () => {
    const signInText = screen.getByText('Sign In')
    expect(signInText).toBeInTheDocument()
  })
  test('should render the input email placeholder', () => {
    const emailInput = screen.getByPlaceholderText(/Email/i)
    expect(emailInput).toBeInTheDocument()
  })

  test('should render the input password placeholder', () => {
    const passwordInput = screen.getByPlaceholderText(/Password/i)
    expect(passwordInput).toBeInTheDocument()
  })
  test('Log in button is present', () => {
    const logInButton = screen.getByText('Log In')
    expect(logInButton).toBeInTheDocument()
  })
  test('should render the email label with the correct text', () => {
    const labelEmailId = screen.getByText('Email-Id :')
    expect(labelEmailId).toBeInTheDocument()
  })
  test('should render the password label with the correct text', () => {
    const labelPassword = screen.getByText('Password :')
    expect(labelPassword).toBeInTheDocument()
  })

  test('renders the login form', () => {
    expect(getByText('Sign In')).toBeInTheDocument()
    expect(getByLabelText('Email-Id :')).toBeInTheDocument()
    expect(getByPlaceholderText('Email')).toBeInTheDocument()
    expect(getByLabelText('Password :')).toBeInTheDocument()
    expect(getByPlaceholderText('Password')).toBeInTheDocument()
  })

  test('button should be disabled for empty password', () => {
    const inputPassword = getByLabelText('Password :')
    fireEvent.change(inputPassword, { target: { value: '' } })
    const btn = getByRole('button', { name: 'Log In' })
    expect(btn).toHaveAttribute('disabled')
  })

  test('handles input changes correctly', () => {
    const emailInput = screen.getByPlaceholderText('Email')
    const passwordInput = screen.getByPlaceholderText('Password')

    fireEvent.change(emailInput, { target: { value: 'test1@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } })

    expect(emailInput).toHaveValue('test1@example.com')
    expect(passwordInput).toHaveValue('testpassword')
  })

  it('toggles password visibility when the eye icon is clicked', () => {
    const passwordInput = screen.getByPlaceholderText('Password')
    const eyeIcon = screen.getByTitle('helps to change the password visibility')

    // Password input should be of type password initially
    expect(passwordInput.type).toBe('password')

    fireEvent.click(eyeIcon)

    // Password input should now be of type text
    expect(passwordInput.type).toBe('text')

    fireEvent.click(eyeIcon)

    // Password input should be of type password again
    expect(passwordInput.type).toBe('password')
  })
})
