import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from './Navbar';
import MapReports from './MapReports'
import { Header, Icon } from 'semantic-ui-react'

class Reports extends Component {

  // this shows the NavBar and the MapReports which is also passed the report items to display on map
  render() {
    if (!this.props.user.user){
      this.props.history.push('/login')
      return null
    }
    return (
      
      <div className="courses">
        <Navbar/>
        <Header size='medium' color='brown'> 
        <Icon name='hand point down'/>
        {this.props.user.user}, 
        {this.props.reports.length > 0 ? " Here Are The Poops In Your Neighborhood!" : "No Poop In Your Neighborhood!"}
        </Header> 
        <MapReports reports={this.props.reports} zipcode={this.props.user.zipcode} gps={this.props.user.gps}/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { 
    reports: state.reports,
    user: state.users
   }
}

export default connect(mapStateToProps)(Reports)
