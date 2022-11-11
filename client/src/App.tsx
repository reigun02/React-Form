import Loader from './components/Loader/Loader'
import Form from './components/Form/Form'
import { useState } from 'react'
import DialogboxModal from './components/DialogboxModal/DialogboxModal'
import styles from './App.module.scss'

const App = () => {
  // States
  const [showLoader, setLoader] = useState(false)
  const [showDialogModal, setDialogModal] = useState(false)

  const handleSetDialogModal = (showModal: boolean) => {
    setDialogModal(showModal)
  }

  const handleSetLoader = (loading: boolean) => {
    setLoader(loading)
  }

  return (
    <main className={styles.container}>
      {showLoader && <Loader />}
      <DialogboxModal
        showDialogModal={showDialogModal}
        handleSetDialogModal={handleSetDialogModal}
      />
      <Form
        handleSetLoader={handleSetLoader}
        handleSetDialogModal={handleSetDialogModal}
      />
    </main>
  )
}

export default App
