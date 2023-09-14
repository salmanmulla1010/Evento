import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { expect, jest, test } from '@jest/globals'
import Signup from './Signup'
import { BrowserRouter } from 'react-router-dom'
const { getByLabelText, getByPlaceholderText, getByText } = render()

describe('Signup Component', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    )
  })
  test('Sign Up Present', () => {
    const signUpText = screen.getByText('Sign Up')
    expect(signUpText).toBeInTheDocument()
  })

  test('should render the input first name  placeholder', () => {
    const firstNameInput = screen.getByPlaceholderText(/First Name/i)
    expect(firstNameInput).toBeInTheDocument()
  })

  test('should render the input last name placeholder', () => {
    const lastNameInput = screen.getByPlaceholderText(/Last Name/i)
    expect(lastNameInput).toBeInTheDocument()
  })

  test('should render the input email placeholder', () => {
    const emailInput = screen.getByPlaceholderText(/Email/i)
    expect(emailInput).toBeInTheDocument()
  })

  test('should render the input password placeholder', () => {
    const passwordInput = screen.getByPlaceholderText(/Password/i)
    expect(passwordInput).toBeInTheDocument()
  })
  test('register button is present', () => {
    const signupButton = screen.getByText('Register')
    expect(signupButton).toBeInTheDocument()
  })

  test('should render the first name label with the correct text', () => {
    const labelFirstName = screen.getByText('Your First Name')
    expect(labelFirstName).toBeInTheDocument()
  })

  test('should render the last name label with the correct text', () => {
    const labelLastName = screen.getByText('Your Last Name')
    expect(labelLastName).toBeInTheDocument()
  })
  test('should render the email label with the correct text', () => {
    const labelEmailId = screen.getByText('Email-Id')
    expect(labelEmailId).toBeInTheDocument()
  })
  test('should render the password label with the correct text', () => {
    const labelPassword = screen.getByText('Password')
    expect(labelPassword).toBeInTheDocument()
  })

  test('should update the first name state when input value changes', () => {
    const firstnameInput = screen.getByLabelText('Your First Name')
    // Simulate user typing a first name
    fireEvent.change(firstnameInput, { target: { value: 'Salman' } })
    // Verify that the first name state is updated
    expect(firstnameInput.value).toBe('Salman')
  })
  test('should update the last name state when input value changes', () => {
    const lastnameInput = screen.getByLabelText('Your Last Name')
    // Simulate user typing a first name
    fireEvent.change(lastnameInput, { target: { value: 'Mulla' } })
    // Verify that the last name state is updated
    expect(lastnameInput.value).toBe('Mulla')
  })
  test('should update the email state when input value changes', () => {
    const emailInput = screen.getByLabelText('Email-Id')
    // Simulate user typing a first name
    fireEvent.change(emailInput, { target: { value: 'salman@gmail.com' } })
    // Verify that the email state is updated
    expect(emailInput.value).toBe('salman@gmail.com')
  })

  test('should update the password state when input value changes', () => {
    const inputElement = getByPlaceholderText('Password')
    // Simulate user typing a password
    fireEvent.change(inputElement, { target: { value: 'SalmanMulla1010' } })
    // Verify that the password state is updated
    expect(inputElement.value).toBe('SalmanMulla1010')
  })
  test('should update the password state when input value changes', () => {
    const inputElement = getByPlaceholderText('Password')
    // Simulate user typing a password
    fireEvent.change(inputElement, { target: { value: 'SalmanMulla1010' } })
    // Verify that the password state is updated
    expect(inputElement.value).toBe('SalmanMulla1010')
  })

  test('should validate the password onBlur', () => {
    // const { getByPlaceholderText, getByText } = render()
    const inputElement = getByPlaceholderText('Password')

    // Simulate user entering an invalid password
    fireEvent.change(inputElement, { target: { value: 'Weak' } })
    fireEvent.blur(inputElement)

    // Verify that the validation message is displayed
    const validationMessage = getByText(
      'Atleast One(UpperCase, LowerCase, Number & Special Character) Minimum-length(8).'
    )
    expect(validationMessage).toBeInTheDocument()
  })

  test('should have a "form-label" class', () => {
    expect(getByText('Your First Name')).toHaveClass('form-label')
    expect(getByText('Your Last Name')).toHaveClass('form-label')
    expect(getByText('Email-Id')).toHaveClass('form-label')
    expect(getByText('Password')).toHaveClass('form-label')
  })

  test('validates input fields correctly', () => {
    // Simulate incomplete form submission
    const submitButton = getByText('Register')
    fireEvent.click(submitButton)

    // Validate error messages
    expect(getByText('Your First Name')).toBeInTheDocument()
    expect(getByText('Your Last Name')).toBeInTheDocument()
    expect(getByText('Email-Id')).toBeInTheDocument()
    expect(getByText('Password')).toBeInTheDocument()
  })

  test('renders the form with all fields', () => {
    expect(getByLabelText('Your First Name')).toBeInTheDocument()
    expect(getByLabelText('Your Last Name')).toBeInTheDocument()
    expect(getByLabelText('Email-Id')).toBeInTheDocument()
    expect(getByLabelText('Password')).toBeInTheDocument()
  })

  test('validates the First Name field is not empty', async () => {
    const firstNameInput = getByLabelText('Your First Name')
    fireEvent.change(firstNameInput, { target: { value: '' } })
    fireEvent.blur(firstNameInput)

    await waitFor(() => {
      expect(
        getByText('First Character should be capital and not accepts number.')
      ).toBeInTheDocument()
    })
  })

  test('validates first name input correctly', () => {
    const firstnameInput = screen.getByLabelText('Your First Name')
    fireEvent.change(firstnameInput, { target: { value: 'john' } })
    expect(
      screen.getByText(
        'First Character should be capital and not accepts number.'
      )
    ).toBeInTheDocument()
  })
  test('validates the Last Name field is not empty', async () => {
    const lastnameInput = screen.getByLabelText('Your Last Name')
    fireEvent.change(lastnameInput, { target: { value: '' } })
    fireEvent.blur(lastnameInput)

    await waitFor(() => {
      expect(
        getByText('First Character should be capital and not accepts number.')
      ).toBeInTheDocument()
    })
  })
  test('validates last name input correctly', () => {
    const lastnameInput = screen.getByLabelText('Your Last Name')
    fireEvent.change(lastnameInput, { target: { value: 'mulla12' } })
    expect(
      screen.getByText(
        'First Character should be capital and not accepts number.'
      )
    ).toBeInTheDocument()
  })
})
