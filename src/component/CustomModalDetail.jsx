import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';

const CustomModalDetail = ({
  show, handleClose,  headerTitle, children
}) => {
  return (
    <Modal show={show} onHide={handleClose} size="xl" centered>
      <Modal.Header style={{ justifyContent: 'center' }}>
        <h4 className="text-blue-dark text-center">{headerTitle}</h4>
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
      <Modal.Footer>
        <button className="btn-border-blue" onClick={handleClose}>Close</button>
      </Modal.Footer>
    </Modal>
  );
};

CustomModalDetail.propTypes = {
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  headerTitle: PropTypes.string,
  children: PropTypes.node.isRequired,
}


export default CustomModalDetail;
