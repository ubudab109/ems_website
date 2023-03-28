/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { useSelector } from 'react-redux';

const containerStyle = {
  width: '100%',
  height: '500px'
};

const MapGoole = () => {
  const stateBranch = useSelector(state => state.auth.branch);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY
  })

  const center = {
    lat: parseInt(stateBranch.latitude),
    lng: parseInt(stateBranch.longitude),
  };

  const onLoad = marker => {
    console.log('marker: ', marker)
  }


  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        onLoad={onLoad}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <Marker
          icon={{
            url: `${process.env.PUBLIC_URL}/assets/img/marker.png`,
          }}
          label={stateBranch.address}
          position={center}
        />
        <></>
      </GoogleMap>
  ) : <></>
}

export default React.memo(MapGoole);
