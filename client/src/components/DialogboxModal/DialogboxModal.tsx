import Dialog from '@mui/material/Dialog'
import styles from './DialogboxModal.module.scss'
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox'
import CloseIcon from '@mui/icons-material/Close'
import { ReactComponent as PartyIcon } from '../../img/party.svg'

interface IProps {
  showDialogModal: boolean
  handleSetDialogModal: (showDialogModal: boolean) => void
}

const DialogboxModal = ({ showDialogModal, handleSetDialogModal }: IProps) => {
  const handleCloseDialogModal = () => {
    handleSetDialogModal(false)
  }

  return (
    <Dialog
      className={styles.dialogbox}
      open={showDialogModal}
      onClose={handleCloseDialogModal}
    >
      <div className={styles.heading}>
        <div className={styles.title}>
          <ForwardToInboxIcon />
          <h4>Email Sent</h4>
        </div>
        <CloseIcon onClick={handleCloseDialogModal} />
      </div>
      <span className={styles.content}>
        <PartyIcon /> Email is successfully sent, please check your inbox for
        the form details
      </span>
    </Dialog>
  )
}

export default DialogboxModal
