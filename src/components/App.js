import React, { Component } from 'react';
import '../App.css';

import Navbar from './common/Navbar'

import { connect } from 'react-redux'
import { currentUser } from '../actions/authActions'

import { BrowserRouter} from 'react-router-dom'
import AuthorizedRoutes from './routes/AuthorizedRoutes'
import UnauthorizedRoutes from './routes/UnauthorizedRoutes'


class App extends Component {

  componentWillMount() {
    this.props.currentUser()
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Navbar/>
            <div className="container text-center">
              <div className="jumbotron">
                { this.props.user? 
                  <AuthorizedRoutes/>
                  :
                  <UnauthorizedRoutes/>
                }
              </div>
            </div>
          </div>
        </BrowserRouter>
      </div>
  )}
}

const mapStateToProps = state => ({
  user: state.auth.user
})

export default connect(mapStateToProps, { currentUser} )(App)
