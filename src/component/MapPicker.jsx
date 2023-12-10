import React from "react";
import PropTypes from 'prop-types';
import CustomModalDetail from "./CustomModalDetail";

const MapPicker = (
  modalMap,
  handleClose,
  defaultLocation,
  zoom,
  handleChangeLocation,
  handleChangeZoom,
  handleSave,
) => (
  <CustomModalDetail
    show={modalMap}
    handleClose={handleClose}
    closeButtonName={"Cancel"}
    isEditable
    children={
      <MapPicker
        defaultLocation={defaultLocation}
        zoom={zoom}
        mapTypeId="roadmap"
        style={{ height: "700px" }}
        onChangeLocation={handleChangeLocation}
        onChangeZoom={handleChangeZoom}
        apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
      />
    }
    handleSave={handleSave}
  />
);

MapPicker.propTypes = {
  modalMap: PropTypes.bool,
  handleClose: PropTypes.func,
  defaultLocation: PropTypes.object,
  zoom: PropTypes.any,
  handleChangeLocation: PropTypes.func,
  handleChangeZoom: PropTypes.func,
  handleSave: PropTypes.func,
};

MapPicker.defaultProps = {
  modalMap: false,
};

export default MapPicker;
