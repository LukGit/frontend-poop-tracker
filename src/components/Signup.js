import React, { Component } from 'react';
import { connect } from 'react-redux';

class Signup extends Component {

  state = {
    username: '',
    password: '',
    retype: '',
    zipcode: 0
  }

}
export default connect(null, {addUser})(Signup)