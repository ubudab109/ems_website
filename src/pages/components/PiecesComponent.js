import React from "react";

export const RequiredIcon = () => (
  <span className="text-light-red" style={{ fontWeight: '500' }}>
    <img src={`${process.env.PUBLIC_URL}/assets/img/warning.png`} alt="warning" />
    <span className="ml-4">Required</span>
  </span>
);
