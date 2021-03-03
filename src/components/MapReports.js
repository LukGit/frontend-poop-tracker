import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
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
    // set center GPS to user registered GPS
    this.setState({
      centerGPS: this.props.gps
    })
  }
  
  handleClick = (r_gps) => {
    // this set the recenter GPS when user clicks on poop report
    this.setState({
      recenterGPS: r_gps
    })
  }
  // this shows a map with all the poop reports as markers on map
  // each report item from store is mapped to a marker on map based on gps extracted from report photo
  // initialCenter is to set map center when map is initially loaded
  // center is to set the map center when map is recentered by a user click
  render() {
    return (
      <Map google={this.props.google} 
      zoom={15}
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
          onClick={() => this.handleClick({lat: r.poop_lat, lng: r.poop_lng})}
          >
          </Marker>
        })}
      </Map>
    );
  }
}
// api key in .env file
export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(withRouter(MapReports))