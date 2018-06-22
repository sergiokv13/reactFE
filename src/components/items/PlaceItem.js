import React, { Component } from 'react';
import { connect } from 'react-redux'
import { currentUser } from '../../actions/authActions'
import Loader from '../loader/Loader'

class PlaceItem extends Component {
  
  constructor(props){
    super(props)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.fechPlaceItem = this.fechPlaceItem.bind(this)
    this.state = {
      macAddress: '4844878FCA26',
      loading: false
    }
  }

  componentWillMount() {
    this.props.currentUser()
  }

  render() {
      return (
        <div>
          <h3>Place item in truck</h3>
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
            
            { this.state.loading ? <Loader/> : <button type="submit" 
                    value="Submit" 
                    onClick={this.fechPlaceItem}
                    className="btn btn-success"
            >Place</button> }
          </form>
        </div>
      )
  }

  fechPlaceItem(event) {
    event.preventDefault();
    this.setState({loading: true});
    fetch('http://localhost:3000/inventory/place_item?item_mac=' + this.state.macAddress+ '&employee_id=' + this.props.user.id)
      .then(res => res.json())
      .then(data => {
        this.setState({loading: false});
        alert( data.data? data.data : "The item is already in use")})
      .catch(error => {
        this.setState({loading: false});
        alert("Technical debt - show error message")})
  }

  handleInputChange(event) {
   const target = event.target
   const value = target.value
   const name = target.name
   this.setState({[name]: value})
  }

}

const mapStateToProps = state => ({
  user: state.auth.user
})

export default connect(mapStateToProps, {currentUser})(PlaceItem)
