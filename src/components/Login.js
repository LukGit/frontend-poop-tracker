import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addUser } from '../actions'
import { currentUser } from '../actions'
import { Form, Header, Icon } from 'semantic-ui-react'

class Login extends Component {
  state = {
    username: '',
    password: ''
  }

  componentDidMount () {
    const token = localStorage.getItem('token')
    if(!token) {
      this.props.history.push('/login')
    }else {
      const reqObj = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      fetch('http://localhost:3000/current_user', reqObj)
      .then(resp => resp.json())
      .then(user => {
        if (user.error) {
          this.props.history.push('/login')
        } else {
          this.props.currentUser(user)
        }
      })
    }
  }

  handleChange = (event, {name, value}) => {
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div className="login">
      <Header className="pageTitle" as="h1" size="huge" icon inverted>
        <Icon name="golf ball"/>
        Welcome To The Dog Poop Tracker
      </Header>
        <Form onSubmit={this.loginUser}>
        <Form.Group widths='equal' inline >
          <Form.Input name="username" placeholder="User name" onChange={this.handleChange} type='text' value={this.state.username} />
          <Form.Input name="password" placeholder="Password" onChange={this.handleChange} type='password' value={this.state.password} />
          <Form.Input type='submit' value='Login'/>
        </Form.Group>        
       </Form>
      </div>
    )
  }
}

export default connect(null, {addUser, currentUser})(Login)
