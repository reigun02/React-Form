import AddIcon from '@mui/icons-material/Add'
import { Button } from '@mui/material'
import TextField from '@mui/material/TextField'
import axios from 'axios'
import React, { useRef, useState } from 'react'
import useForm from '../../hooks/useForm'
import {
  emailValidation,
  generateEmailHelperText,
  inputTextValidation
} from '../../utils/helper'
import styles from './Form.module.scss'

interface IProps {
  handleSetLoader: (loading: boolean) => void
  handleSetDialogModal: (showDialogModal: boolean) => void
}

const Form = ({ handleSetLoader, handleSetDialogModal }: IProps) => {
  // States
  const [files, setFiles] = useState<string[]>([])

  // Refs
  const form = useRef<HTMLFormElement>(null)
  const fileUploadButtonRef = useRef<HTMLInputElement>(null)

  // Custom hooks
  // First name
  const {
    value: enteredFirstName,
    valueIsValid: enteredFirstNameIsValid,
    hasError: firstNameInputHasError,
    inputChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: resetFirstNameInput
  } = useForm(inputTextValidation)

  // Last name
  const {
    value: enteredLastName,
    valueIsValid: enteredLastNameIsValid,
    hasError: lastNameInputHasError,
    inputChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetLastNameInput
  } = useForm(inputTextValidation)

  // Description
  const {
    value: enteredDescription,
    valueIsValid: enteredDescriptionIsValid,
    hasError: descriptionInputHasError,
    inputChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
    reset: resetDescriptionInput
  } = useForm(inputTextValidation)

  // Email
  const {
    value: enteredEmail,
    valueIsValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput
  } = useForm(emailValidation)

  const handleAddImageClick = () => {
    // Selects the element input of type='file'
    const fileUploadButton = document.getElementById('fileUploadBtn')

    // Fire click event to trigger file selection for upload
    fileUploadButton?.click()
  }

  // Saves the selected file for upload in local state for preview
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0]
    setFiles(prevFiles => [...prevFiles, URL.createObjectURL(file)])

    // Change target value to trigger onChange even if same file gets uploaded consecutively
    event.target.value = ''
  }

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // Show page loader
    handleSetLoader(true)

    try {
      await sendMail()

      // Reset states
      resetFirstNameInput()
      resetLastNameInput()
      resetDescriptionInput()
      resetEmailInput()
      setFiles([])

      // Show success modal
      handleSetDialogModal(true)
    } catch (error) {
      console.error(error)
    } finally {
      // Hide page loader
      handleSetLoader(false)
    }
  }

  // Call sendmail endpoint in backend
  const sendMail = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const body = JSON.stringify({
      firstName: enteredFirstName,
      lastName: enteredLastName,
      smallDescription: enteredDescription,
      email: enteredEmail,
      numberOfFilesUploaded: files.length
    })

    try {
      await axios.post('/sendmail', body, config)
    } catch (error: any) {
      throw new Error(error)
    }
  }

  const isFormValid =
    enteredFirstNameIsValid &&
    enteredLastNameIsValid &&
    enteredDescriptionIsValid &&
    enteredEmailIsValid

  return (
    <form
      ref={form}
      onSubmit={handleFormSubmit}
      className={styles.formContainer}
    >
      <h2 className={styles.formTitle}>Simple Form</h2>
      <div className={styles.formInputs}>
        {/* First Name */}
        <TextField
          name="firstName"
          value={enteredFirstName}
          label="First Name"
          className={styles.formTextfieldName}
          variant="outlined"
          onChange={firstNameChangeHandler}
          onBlur={firstNameBlurHandler}
          error={firstNameInputHasError}
          helperText={firstNameInputHasError ? 'First name is required' : ''}
          inputProps={{ spellCheck: 'false' }}
        />
        {/* Last Name */}
        <TextField
          name="lastName"
          value={enteredLastName}
          className={styles.formTextfieldName}
          label="Last Name"
          variant="outlined"
          onChange={lastNameChangeHandler}
          onBlur={lastNameBlurHandler}
          error={lastNameInputHasError}
          helperText={lastNameInputHasError ? 'Last name is required' : ''}
          inputProps={{ spellCheck: 'false' }}
        />
        {/* Description */}
        <TextField
          name="smallDescription"
          value={enteredDescription}
          className={styles.formTextArea}
          label="Small description"
          variant="outlined"
          onChange={descriptionChangeHandler}
          onBlur={descriptionBlurHandler}
          error={descriptionInputHasError}
          helperText={
            descriptionInputHasError ? 'Small description is required' : ''
          }
          multiline
          rows={3}
          inputProps={{ spellCheck: 'false' }}
        />
        {/* Email */}
        <TextField
          name="email"
          value={enteredEmail}
          className={styles.formTextfieldEmail}
          label="Email Address"
          variant="outlined"
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          error={emailInputHasError}
          helperText={generateEmailHelperText(enteredEmail, emailInputHasError)}
          inputProps={{ spellCheck: 'false' }}
        />
      </div>
      {/* Image grid */}
      <div className={styles.formImages}>
        {files.map(file => (
          <img key={file} src={file} alt="Uploaded File" />
        ))}
      </div>
      {/* Form actions */}
      <div className={styles.formActions}>
        <Button
          color="inherit"
          onClick={handleAddImageClick}
          startIcon={<AddIcon />}
        >
          Add Image
        </Button>
        <input
          id="fileUploadBtn"
          onChange={handleFileUpload}
          type="file"
          accept="image/*"
          ref={fileUploadButtonRef}
        />
        <Button type="submit" variant="contained" disabled={!isFormValid}>
          Upload
        </Button>
      </div>
    </form>
  )
}

export default Form
