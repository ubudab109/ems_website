import React from "react";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const RequiredIcon = () => (
  <span className="text-red">
    <FontAwesomeIcon icon={faCircleExclamation} /> Required
  </span>
);
