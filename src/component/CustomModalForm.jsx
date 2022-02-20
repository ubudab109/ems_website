import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';

const CustomModalForm = ({
  show, handleClose, handleSure, children, headerTitle, submitText, isSendButtonDisabled
}) => {
  return (
    <Modal show={show} onHide={handleClose} size="sm" centered>
      <Modal.Header style={{ justifyContent : 'center'}}>
        <h4 className="text-blue-dark text-center">{headerTitle}</h4>
      </Modal.Header>
      <Modal.Body>
        <h1 className="modal-body-logout">
          {children}
        </h1>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn-border-blue" onClick={handleClose}>Cancel</button>
        <button className="btn-blue" disabled={isSendButtonDisabled} onClick={handleSure}>{submitText}</button>
      </Modal.Footer>
    </Modal>
  );
};

CustomModalForm.propTypes = {
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  headerTitle: PropTypes.string,
  handleSure: PropTypes.func,
  children: PropTypes.node.isRequired,
  submitText: PropTypes.string,
  isSendButtonDisabled: PropTypes.bool,
};

export default CustomModalForm;
