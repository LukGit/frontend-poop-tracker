import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from './Navbar';
import MapReports from './MapReports'
import { Label, Icon, Menu, Dropdown } from 'semantic-ui-react'

class Reports extends Component {
  state = {
    poopSizeSelect: "",
    filterReports: [],
    poopSize: [
      {key: 1, text: "Small", value: "S"},
      {key: 2, text: "Medium", value: "M"},
      {key: 3, text: "Large", value: "L"},
      {key: 4, text: "All", value: "All"}
    ]
  }

  componentDidMount () {
    // filter to show only reports in the same zip code
    let filterR = []
    filterR = this.props.reports.filter(r => r.poopzip === this.props.user.zipcode)
    this.setState({
      centerGPS: this.props.gps,
      filterReports: filterR
    })
  }

  selectSize = (e, { value }) => {
    let filterX = []
    if (value === "All") {
      filterX = this.props.reports.filter(r => r.poopzip === this.props.user.zipcode)
    } else {
      let filterS = this.props.reports.filter(r => r.poopzip === this.props.user.zipcode)
      filterX = filterS.filter(r => r.poop_size === value)
    }
    this.setState({
      filterReports: filterX
    })
  }

  // this shows the NavBar and the MapReports which is also passed the report items to display on map
  render() {
    if (!this.props.user.user){
      this.props.history.push('/login')
      return null
    }
    return (
      
      <div className="courses">
        <Navbar/>
        <Menu inverted color='grey' size='mini'>
        <Menu.Item>
        <Label size='large' color='grey'> 
        <Icon name='hand point down'/>
        {this.props.user.user}, 
        {this.props.reports.length > 0 ? " Here Are The Poops In Your Neighborhood!" : "No Poop In Your Neighborhood!"}
        </Label> 
        </Menu.Item>
        {this.props.reports.length > 0 ?
        <Menu.Item>
        <Dropdown 
              fluid
              selection
              search
              onChange={this.selectSize}
              options={this.state.poopSize}
              style={{width: 100}}
              size='medium'
              placeholder='Filter by size'
          /> 
          </Menu.Item> : null}
        </Menu>
        {/* <MapReports reports={this.props.reports} zipcode={this.props.user.zipcode} gps={this.props.user.gps}/> */}
        <MapReports reports={this.state.filterReports} zipcode={this.props.user.zipcode} gps={this.props.user.gps}/>
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
