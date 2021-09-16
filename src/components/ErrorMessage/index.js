import React from "react";

/**
 * @author
 * @function ErrorMessage
 **/

const ErrorMessage = ({ errors }) => {
  return (
    errors.length > 0 && (
      <ul className="errorUl">
        {errors.map((error, index) => {
          return <li key={index}>{error}</li>;
        })}
      </ul>
    )
  );
};

export default ErrorMessage;
