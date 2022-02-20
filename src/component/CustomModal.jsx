import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';

const CustomModal = ({
  show, handleClose, handleSure, text, submitText, isSubmitButtonDisabled
}) => {
  return (
    <Modal show={show} onHide={handleClose} size="sm" centered>
      <Modal.Body>
        <h1 className="modal-body-logout">
          {text}
        </h1>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn-border-blue" onClick={handleClose}>Cancel</button>
        <button className="btn-blue" disabled={isSubmitButtonDisabled} onClick={handleSure}>{submitText}</button>
      </Modal.Footer>
    </Modal>
  );
};

CustomModal.propTypes = {
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  handleSure: PropTypes.func,
  text: PropTypes.string,
  submitText: PropTypes.string,
  isSubmitButtonDisabled: PropTypes.bool,
}

CustomModal.defaultProps = {
  isSubmitButtonDisabled : false,
};

export default CustomModal;
