import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';

const CustomModalDetail = ({
  show, 
  handleClose,
  handleSave,
  headerTitle, 
  children,
  size,
  isEditable,
}) => {
  return (
    <Modal show={show} onHide={handleClose} size={size} centered>
      <Modal.Header>
        <div className="d-flex justify-content-between" style={{ width: '100%' }}>
          <h4 className="text-blue-dark align-items-center align-self-center">{headerTitle}</h4>
          <button className="btn" onClick={handleClose}>
            <img src={`${process.env.PUBLIC_URL}/assets/img/x.png`} alt="" />
          </button>
        </div>
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
      <Modal.Footer>
        {
          isEditable ? <button className="btn-blue" onClick={handleSave}>Save</button> : null
        }
        <button className="btn-border-blue" onClick={handleClose}>Close</button>
      </Modal.Footer>
    </Modal>
  );
};

CustomModalDetail.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func,
  headerTitle: PropTypes.string,
  children: PropTypes.node.isRequired,
  size: PropTypes.string,
  isEditable: PropTypes.bool,
  handleSave: PropTypes.func,
};

CustomModalDetail.defaultProps = {
  size: 'xl',
  isEditable: false,
};


export default CustomModalDetail;
