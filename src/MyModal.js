// import { Modal } from 'bootstrap'
import React, { Children, useState } from 'react'
import {Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from 'react-bootstrap'
import InputFieldComponent from './InputFieldComponent'
import { Button } from '@mui/material'

const MyModal = ({show,Update,onHide,close,Children}) => {
  // const[openModal,setOpenModal]=useState(false)
  // const handleOpen=()=>{
  //   setOpenModal(true)
  //   }
    
  return (
    < >
    <div>
      <Modal show={show} onHide={onHide}>
        <ModalHeader closeButton>
          <ModalTitle>
            Login page
          </ModalTitle>
        </ModalHeader>
        <ModalBody>
          {Children}
        </ModalBody>
        <ModalFooter>
          <Button variant='contained'>{Update}</Button>
          <Button variant='contained'>{close}</Button>
        </ModalFooter>
      </Modal>
    </div>
    </>
  )
}

export default MyModal