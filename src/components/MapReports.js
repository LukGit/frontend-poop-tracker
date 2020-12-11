import React, { Component } from 'react';
import {Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import PoopIconS from '../img/poop-s.png'
import PoopIconM from '../img/poop-m.png'
import PoopIconL from '../img/poop-l.png'
import { withRouter } from 'react-router-dom'

export class MapBuckets extends Component {
  state = {
    centerGPS: {}
  }
  
  componentDidMount () {
    const G_URL = "https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDAAA0HEZLvUa2hQ-54gAG5TXheH1-pEZY&components=postal_code:" + this.props.zipcode
    fetch(G_URL)
    .then(resp => resp.json())
    .then(location => {
      console.log("zip code gps", location)
      
      })
    }
  //this redirects to the bucket item page when bucket item on map is clicked
  handleClick = (r_id) => {
    this.props.history.push(`/reports/${r_id}`)
  }
  // this shows a map with all the bucket items as markers on map
  // each bucket item from store is mapped to a marker on map based on gps of item course
  render() {
    
    return (
      <Map google={this.props.google} 
      zoom={3}
      initialCenter={{lat: 25.014313, lng: -95.972535}}
      >
        {this.props.reports.map(r => {
          let pIcon
          if (r.size === "S") {
            pIcon = PoopIconS
          } else if (r.size === "M") {
            PIcon = PoopIconM
          } else {
            PIcon = PoopIconL
          }
          return <Marker
          key={r.id}
          icon={PIcon}
          position={{lat: r.poop_lat, lng: r.poop_lng }}
          onClick={() => this.handleClick(r.id)}
          >
          </Marker>
        })}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDAAA0HEZLvUa2hQ-54gAG5TXheH1-pEZY'
})(withRouter(MapReports))