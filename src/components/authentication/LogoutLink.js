import React, { Component } from 'react';
import { connect } from 'react-redux'
import { logout } from '../../actions/authActions'
import { currentUser } from '../../actions/authActions'


class LogoutLink extends Component {
  
  constructor(props){
    super(props)
    this.logout = this.logout.bind(this)
  }

  componentWillMount() {
    this.props.currentUser()
  }

  render() {
    return (
        <a onClick={this.logout}>Logout</a>
      )
  }

  logout() {
    this.props.logout()
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
})

export default connect(mapStateToProps, {logout, currentUser})(LogoutLink)
