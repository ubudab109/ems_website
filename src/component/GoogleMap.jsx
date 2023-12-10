/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import PropTypes from 'prop-types';

const containerStyle = {
  width: "100%",
  height: "500px",
};

const MapGoole = ({ latitude, longitude, address, zoomMap }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  const center = {
    lat: parseFloat(latitude),
    lng: parseFloat(longitude),
  };

  /**
   * On Load Marker
   * @param {Any} marker
   * @returns
   */
  const onLoad = (marker) => {
    return marker;
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={zoomMap}
      onLoad={onLoad}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <Marker
        icon={{
          url: `${process.env.PUBLIC_URL}/assets/img/marker.png`,
        }}
        label={address}
        position={center}
      />
      <></>
    </GoogleMap>
  ) : (
    <></>
  );
};

MapGoole.propTypes = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  address: PropTypes.string.isRequired,
  zoomMap: PropTypes.any,
};

MapGoole.defaultProps = {
  zoomMap: 20,
};

export default React.memo(MapGoole);
