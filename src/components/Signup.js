import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Header, Icon, Label} from 'semantic-ui-react'

class Signup extends Component {

  state = {
    username: '',
    password: '',
    retype: '',
    zipcode: 0,
    badpw: false,
    bademail: false
  }

  handleChange = (event, {name, value}) => {
    this.setState({ [name]: value });
}

signupUser = (e) => {
  e.preventDefault()
  if (this.state.password !== this.state.retype) {
    // clear state when passwords don't matach
    this.setState({
      badpw: true,
      password: "",
      retype: ""
    })
  } else {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.state.username)) {
    // post to the signup endpoint 
      const USER_URL = 'http://localhost:3000/signup'
      const reqObj = {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({username: this.state.username, password: this.state.password, zipcode: this.state.zipcode})
      }
      fetch(USER_URL, reqObj)
      .then(resp => resp.json())
      .then(userData => {
        if (userData.error) {
          alert(userData.error)
        } else {
          // save the return token
          localStorage.setItem("token", userData.jwt) 
          // add user to the redux store
          this.props.addUser(userData)
        }
      })
    } else {
      this.setState ({
        bademail: true
      })
    }
  }
}
  render() {
    return (
      <div className="login">
      <Header className="pageTitle" as="h1" size="huge" icon inverted>
        <Icon name="golf ball"/>
        Please sign up
      </Header>
        <Form onSubmit={this.signupUser}>
        <Form.Group widths='equal' inline >
          <Form.Input name="username" placeholder="User name" onChange={this.handleChange} type='text' value={this.state.username} autoFocus/>
          <Form.Input name="password" placeholder="Password" onChange={this.handleChange} type='password' value={this.state.password} />
          <Form.Input name="retype" placeholder="Retype password" onChange={this.handleChange} type='password' value={this.state.retype}/>
          <Form.Input name="zipcode" placeholder="Zipcode" onChange={this.handleChange} type='text' value={this.state.zipcode} />
          <Form.Input type='submit' value='Signup'/>
        </Form.Group>        
       </Form>
       {this.state.badpw ? <Label inverted color='red' pointing>Passwords not matched. Try again.</Label> : null}
       {this.state.bademail ? <Label inverted color='red' pointing>Please enter valid email address.</Label> : null}
      </div>
    )
  }


  render() {
    return (
      <div className="login">
      <Header className="pageTitle" as="h1" size="huge" icon inverted>
        <Icon name="golf ball"/>
        Please sign up
      </Header>
        <Form onSubmit={this.signupUser}>
        <Form.Group widths='equal' inline >
          <Form.Input placeholder="Email address" onChange={this.handleChangeUser} type='text' value={this.state.username} autoFocus/>
          <Form.Input placeholder="Password" onChange={this.handleChangePw} type='password' value={this.state.password} />
          <Form.Input placeholder="Retype password" onChange={this.handleRetype} type='password' value={this.state.retype}/>
          <Form.Input type='submit' value='Signup'/>
        </Form.Group>        
       </Form>
       {this.state.badpw ? <Label inverted color='red' pointing>Passwords not matched. Try again.</Label> : null}
       {this.state.bademail ? <Label inverted color='red' pointing>Please enter valid email address.</Label> : null}
      </div>
    )
  }  
}
export default connect(null, {addUser})(Signup)