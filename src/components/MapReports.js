import React, { Component } from 'react';
import {Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import PoopIconS from '../img/poop-s.png'
import PoopIconM from '../img/poop-m.png'
import PoopIconL from '../img/poop-l.png'
import { withRouter } from 'react-router-dom'

export class MapReports extends Component {
  state = {
    // centerGPS: {lat: 41.4444, lng: -87.61616959999999}
    centerGPS: this.props.gps,
    filterReports: []
  }
  
  componentDidMount () {
    console.log("component did mount", this.props)
    let filterR = []
    filterR = this.props.reports.filter(r => r.user.zipcode === this.props.zipcode)
    this.setState({
      centerGPS: this.props.gps,
      filterReports: filterR
    })
  }
  
  handleClick = (r_id) => {
    this.props.history.push(`/reports/${r_id}`)
  }
  // this shows a map with all the bucket items as markers on map
  // each bucket item from store is mapped to a marker on map based on gps of item course
  render() {
    console.log(this.state.centerGPS)
    return (
      <Map google={this.props.google} 
      zoom={14}
      initialCenter={this.state.centerGPS}
      >
        {this.state.filterReports.map(r => {
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