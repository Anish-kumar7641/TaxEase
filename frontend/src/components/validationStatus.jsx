import React from "react";

function ValidationStatus({ status }) {
  if (!status) return null;

  return (
    <div className={`validation-status ${status.success ? "success" : "error"}`}>
      <h3>{status.success ? "Validation Successful" : "Validation Error"}</h3>
      <p>{status.message}</p>
    </div>
  );
}

export default ValidationStatus;
