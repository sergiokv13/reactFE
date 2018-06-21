import React, { Component } from 'react';
import { connect } from 'react-redux'
import { login } from '../../actions/authActions'

class LoginForm extends Component {
  
  constructor(props){
    super(props)
    this.submitForm = this.submitForm.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.state = {
      userId: '32',
      locationId: '828',
      userIdError: '',
      locationIdError: '',
    }
  }

  render() {
      return (
        <div>
          <h1>Please Login!</h1>
          <form>

            <div className="form-group">
              <label> User Id </label>
              <input  type="text" 
                      name="userId"
                      value={this.state.userId}  
                      onChange={this.handleInputChange}
                      className="form-control"
              />
              <span className="text-danger">{this.state.userIdError}</span>
            </div>

  
            <div className="form-group">
              <label> Location Id </label>
              <input  type="text"
                      name="locationId"
                      value={this.state.locationId} 
                      onChange={this.handleInputChange}
                      className="form-control"
              />
              <span className="text-danger">{this.state.locationIdError}</span>
            </div>
            
            

            <button type="submit" 
                    value="Submit" 
                    onClick={this.submitForm}
                    className="btn btn-success"
            >Login</button>
          </form>
        </div>
      )
  }

  submitForm(event) {
    event.preventDefault()
    let existErrors = false
    if (this.state.userId === '')
    {
      this.setState({userIdError: "Can't be blank."})
      existErrors = true
    }
    if (this.state.locationId === '')
    {
      this.setState({locationIdError: "Can't be blank"})
      existErrors = true
    }
    if (!existErrors)
    {
      this.props.login({
          userId: this.state.userId,
          locationId: this.state.locationId
        }
      )
    }
  }

  handleInputChange(event) {
   const target = event.target
   const value = target.value
   const name = target.name
   this.setState({[name]: value})
   this.setState({[name + "Error"]: ''})
  }

}

export default connect(null, { login })(LoginForm)
