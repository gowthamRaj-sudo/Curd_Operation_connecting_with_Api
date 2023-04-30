import { TextField } from '@mui/material'
import React from 'react'

const InputFieldComponent = ({size,name,value,onChange,type,label}) => {
  return (
    <>
<div>
  <TextField  size={size} type={type} name={name} value={value} onChange={onChange} label={label}/>
</div>



    </>
  )
}

export default InputFieldComponent