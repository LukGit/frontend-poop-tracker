import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { logoutUser } from '../actions';
import { withRouter } from 'react-router-dom'
import { addReport } from '../actions'
import { Menu } from 'semantic-ui-react'


class Navbar extends Component {
  state = {
    reportList:[],
    courseName: "",
    weather: {}
  }
  
  componentDidMount () {
    
  }

  refreshData = () => {
    const reqObj = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }
    fetch('http://localhost:3000/reports', reqObj)
      .then(resp => resp.json())
      .then(reports => {
        this.props.addReport(reports)
        this.props.history.push('/reports')
      })
  }
  // this handles logout by removing the token in local storage and calling logoutUser in reducer
  handleLogout = (e) => {
    localStorage.removeItem('token')
    this.props.logoutUser()
  }

  getWeather = (zip) => {
    const W_URL = "https://api.weatherapi.com/v1/forecast.json?key=0def2099dc364881957133838202806&q=" + zip
    fetch(W_URL)
    .then(resp => resp.json())
    .then(weatherResp => {
      this.setState({
        weather: weatherResp
      })
    })
  }
  render() {
    return (
      <Menu inverted color='brown' size='mini'>
        <Menu.Item >
          <Link to={`/reports/new`} className="item">
            New Report
          </Link>
        </Menu.Item>
        <Menu.Item position='right'>
          <Link onClick={this.handleLogout}to={'/login'} className="item">
            Sign Out
          </Link>
        </Menu.Item>
      </Menu>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.users
  }
}
// withRouter is need to route to reports page because NavBar is not a component under BrowserRouter in App.js
export default connect(mapStateToProps, { logoutUser, addReport } )(withRouter(Navbar))