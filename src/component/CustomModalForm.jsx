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
      <form onSubmit={handleSure}>
        <Modal.Body>
          <div className="modal-body-logout">
            {children}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button type="button" className="btn-border-blue" onClick={handleClose}>Cancel</button>
          <button type="submit" className="btn-blue" disabled={isSendButtonDisabled}>{submitText}</button>
        </Modal.Footer>
      </form>
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
