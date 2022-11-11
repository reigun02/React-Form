import styles from './Loader.module.scss'
import { Box } from '@mui/material'
import LinearProgress from '@mui/material/LinearProgress'

const Loader = () => {
  return (
    <>
      <div className={styles.backdrop}>
        <h2>Uploading Form</h2>
        <Box sx={{ width: '40%' }}>
          <LinearProgress />
        </Box>
      </div>
    </>
  )
}

export default Loader
