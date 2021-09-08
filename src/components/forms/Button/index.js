import React from 'react'
import './style.scss';
/**
* @author
* @function Button
**/

const Button = ({children, ...otherProps}) => {
  return(
    <button className="btn" {...otherProps}>
      {children}
    </button>
   )

 }

export default Button