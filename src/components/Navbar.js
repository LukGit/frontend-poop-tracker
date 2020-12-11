import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { logoutUser } from '../actions';
import { withRouter } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'


class Navbar extends Component {
  state = {
    reportList:[],
    courseName: ""
  }
  // when component is initially loaded, set local set with courses from store with course name and id
  componentDidMount () {
    
  }

  // this handles logout by remocing the token in local storage and calling logoutUser in reducer
  handleLogout = event => {
    localStorage.removeItem('token')
    this.props.logoutUser()
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
// withRouter is need to route to course page because NavBar is not a component under BrowserRouter in App.js
export default connect(mapStateToProps, { logoutUser } )(withRouter(Navbar))