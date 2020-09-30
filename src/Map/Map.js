import React from 'react'
import './Map.css'
import {showDataMap} from '../util'
import {Map as LeafletMap, TileLayer} from "react-leaflet"
const Map = ({countries, casesType, center, zoom}) => {
    return (
        <div className="map">
        <LeafletMap center={center} zoom={zoom}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {showDataMap(countries, casesType)}
        </LeafletMap>
      </div>
    );
    
}

export default Map
