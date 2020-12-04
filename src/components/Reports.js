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
        <Header inverted size='medium'> 
        <Icon name='bitbucket square'/>
        {this.props.user.user}, 
        {this.props.reports.length > 0 ? "Your Bucket List Courses!" : "No Course in Your Bucket!"}
        </Header> 
        <MapReports reports={this.props.reports} zipcode={this.user.zipcode}/>
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
