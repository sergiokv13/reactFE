import React, { Component } from 'react';
import { connect } from 'react-redux'

class CheckStatus extends Component {
  
  constructor(props){
    super(props)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.fechCheckStatus = this.fechCheckStatus.bind(this)
    this.state = {
      macAddress: '4844878FCA26',
    }
  }

  render() {
      return (
        <div>
          <h3>Check item status</h3>
          <form>
            <div className="form-group">
              <label> Mac Address </label>
              <input  type="text" 
                      name="macAddress"
                      placeholder="Mac Address"
                      value={this.state.macAddress}  
                      onChange={this.handleInputChange}
                      className="form-control"
              />
            </div>
            
            <button type="submit" 
                    value="Submit" 
                    onClick={this.fechCheckStatus}
                    className="btn btn-success"
            >Check</button>
          </form>
        </div>
      )
  }

  fechCheckStatus(event) {
    event.preventDefault()
    fetch('http://localhost:3000/inventory/check_mac_status?item_mac=' + this.state.macAddress)
      .then(res => res.json())
      .then(data => alert(data.data))
      .catch(error => alert("Technical debt - show error message"))
  }

  handleInputChange(event) {
   const target = event.target
   const value = target.value
   const name = target.name
   this.setState({[name]: value})
  }

}

export default CheckStatus
