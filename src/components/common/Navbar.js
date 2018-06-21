import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { currentUser } from '../../actions/authActions'
import LogoutLink from '../authentication/LogoutLink'

class Navbar extends Component{

  componentWillMount() {
    this.props.currentUser()
  }

  render() {
    return (
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">

          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link className="navbar-brand" to="/">Inventory FE</Link>
          </div>


          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li>
                <Link to="/techs">Techs</Link>
              </li>
              <li>
                <Link to="/inventory">Inventory</Link>
              </li>
              <li>
                <Link to="/items">Items</Link>
              </li>
            </ul>

            <ul className="nav navbar-nav navbar-right">
              { this.props.user?
                <li className="dropdown">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">User<span className="caret"></span></a>
                  <ul className="dropdown-menu">
                    <li><strong>User Id</strong>: {this.props.user.id}</li>
                    <li><strong>Location Id</strong>: {this.props.user.locationId}</li>
                    <li role="separator" className="divider"></li>
                    <li><LogoutLink/></li>
                  </ul>
                </li>
                : 
                <li>
                  <Link to="/login">Login</Link>
                </li>
              }
            </ul>
            
          </div>
        </div>
      </nav>
  )}
}

const mapStateToProps = state => ({
  user: state.auth.user
})


export default connect(mapStateToProps, { currentUser } )(Navbar)
  


