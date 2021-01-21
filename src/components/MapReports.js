import React, { Component } from 'react';
import {Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import PoopIconS from '../img/poop-s.png'
import PoopIconM from '../img/poop-m.png'
import PoopIconL from '../img/poop-l.png'
import { withRouter } from 'react-router-dom'

export class MapReports extends Component {
  // map gps center is determined by zip code after login
  state = {
    centerGPS: this.props.gps,
    filterReports: [],
    recenterGPS: {}
  }
  
  componentDidMount () {
    // filter to show only reports in the same zip code
    // let filterR = []
    // filterR = this.props.reports.filter(r => r.poopzip === this.props.zipcode)
    // this.setState({
    //   centerGPS: this.props.gps,
    //   filterReports: filterR
    // })
  }
  
  handleClick = (r_gps) => {
    // this.props.history.push(`/reports/${r_id}`)
    this.setState({
      recenterGPS: r_gps
    })
  }
  // this shows a map with all the poop reports as markers on map
  // each report item from store is mapped to a marker on map based on gps extracted from report photo
  render() {
    return (
      <Map google={this.props.google} 
      zoom={14}
      initialCenter={this.state.centerGPS}
      center={this.state.recenterGPS}
      >
        {this.props.reports.map(r => {
          let pIcon
          if (r.poop_size === "S") {
            pIcon = PoopIconS
          } else if (r.poop_size === "M") {
            pIcon = PoopIconM
          } else {
            pIcon = PoopIconL
          }
          return <Marker
          key={r.id}
          icon={pIcon}
          position={{lat: r.poop_lat, lng: r.poop_lng }}
          // onClick={() => this.handleClick(r.id)}
          onClick={() => this.handleClick({lat: r.poop_lat, lng: r.poop_lng})}
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