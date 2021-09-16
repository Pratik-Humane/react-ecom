import React from 'react'
import { useField } from "formik";
import './style.scss';
/**
* @author
* @function FormInput
**/

const FormInput = ({ name, handleChange, label, ...otherProps }) => {
  const [field, meta] = useField(name);
  const configTextField = {
    ...field,
    ...otherProps,
  };
  return(
    <div className="formRow">
      {label && (
        <label>
          {label}
        </label>
      )}
      <input className={`${(meta && meta.touched && meta.error) && 'fieldError'} `} onChange={handleChange} {...configTextField} />
      {(meta && meta.touched && meta.error) && <span className='textError'>{meta.error}</span>}
    </div>
   )

 }

export default FormInput