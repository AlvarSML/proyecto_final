// AIzaSyACjVIcxYixmV3QHW8PFjUvlcUtxyZQHlY
import React, { Component } from 'react'
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

/// TODO : comentar y hacer legible
class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lat: this.props.initialLocation.lat,
      lng: this.props.initialLocation.lng
    }
  }

  render() {
    return (
      <GoogleMap
        defaultZoom={this.props.initialZoom || 8}
        defaultCenter={this.props.initialLocation || { lat: -34.397, lng: 150.644 }}
        options={{ draggable: true }}
      >
        {this.props.isMarkerShown && <Marker
          position={{ lat: this.state.lat, lng: this.state.lng }}
          draggable={true}
          onDragEnd={e => {
            this.setState({
              lat: e.latLng.lat(),
              lng: e.latLng.lng()
            })
            this.props.updateLocation(e.latLng.lat(), e.latLng.lng());
          }}
        />}
      </GoogleMap>
    )
  }
}

export default compose(withProps({
  googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyACjVIcxYixmV3QHW8PFjUvlcUtxyZQHlY&libraries=geometry,drawing,places",
  loadingElement: <div style={{ height: `100%` }} />,
  containerElement: <div id="mapContainer" style={{ height: `400px`, width: `!00%` }} />,
  mapElement: <div id="map" style={{ height: `100%` }} />,
}), withScriptjs, withGoogleMap)(Map);