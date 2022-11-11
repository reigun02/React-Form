import styles from './Loader.module.scss'
import CircularProgress from '@mui/material/CircularProgress'

const Loader = () => {
  return (
    <>
      <div className={styles.backdrop} >
        <h2>Uploading Form</h2>
        <CircularProgress />
      </div>
    </>
  )
}

export default Loader
