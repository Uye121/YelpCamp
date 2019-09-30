import React from 'react';

export const ErrorMessage = (
  error=undefined,
  success=undefined
) => {
  let statusClass = undefined;
  let msg = '';
  if(error && error.length > 0) {
    statusClass = 'alert alert-danger';
    msg = error;
  } else if(success && success.length > 0) {
    statusClass = 'alert alert-success';
    msg = success;
  }
  return (
    <div 
      className={statusClass} 
      role="alert"
    >
      {msg}
    </div>
  );
}
