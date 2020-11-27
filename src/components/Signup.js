import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Header, Icon, Label} from 'semantic-ui-react'

class Signup extends Component {

  state = {
    username: '',
    password: '',
    retype: '',
    zipcode: 0
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
          <Form.Input placeholder="User name" onChange={this.handleChangeUser} type='text' value={this.state.username} autoFocus/>
          <Form.Input placeholder="Password" onChange={this.handleChangePw} type='password' value={this.state.password} />
          <Form.Input placeholder="Retype password" onChange={this.handleRetype} type='password' value={this.state.retype}/>
          <Form.Input placeholder="Email address" onChange={this.handleChangeEmail} type='text' value={this.state.email} />
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