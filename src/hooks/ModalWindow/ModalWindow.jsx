import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import styles from './ModalWindow.module.scss';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
 
  boxShadow: 24,
  p: 4,
};

export default function ModalWindow({modalText,modalTitle ,children ,openModal,setOpenModal }) {

  return (
    <div>
     
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        open={openModal}
        onClose={() => setOpenModal(false)}
        closeAfterTransition
      >
        <Fade in={openModal}>
          <Box sx={{
        height: '100vh',
        width: '100vw',
        position:'fixed',
        top:0,
        left:0,
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
    textAlign:'center',

      }}>
           
            <div className={styles.modal_wrapper}>
            <h2 className={styles.modal_title}>
     {modalTitle}
    </h2>
    <h3 className={styles.modal_text}>{modalText}</h3>
            {children}</div>
          </Box>
        </Fade>
      </Modal>
      
    </div>
  );
}