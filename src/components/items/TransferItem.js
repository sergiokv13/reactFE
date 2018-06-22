import React, { Component } from 'react';
import { connect } from 'react-redux'
import { currentUser } from '../../actions/authActions'
import Loader from '../loader/Loader'

class TransferItem extends Component {
  
  constructor(props){
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.fetchPlaceItem = this.fetchPlaceItem.bind(this)
    this.state = {
      macAddress: '4844878FCA26',
      selectedTech: '',
      techs: [],
      loading: false
    }
  }

  componentWillMount() {
    this.props.currentUser()
    fetch('http://localhost:3000/local_techs/get?employee_id=' + this.props.user.id)
      .then(res => res.json())
      .then(data => this.setState({techs: data.data}))
  }

  render() {

    const techsOptions = this.state.techs.map((tech) =>
      <option 
        key={tech.display_name + tech.display_name}
        value={tech.location_pk}>
        {tech.display_name}
      </option>
    )

    return (
      <div>
        <h3>Transfer item</h3>
        <form>
          <div className="form-group">
            <label> Mac Address </label>
            <input type="text" 
                    name="macAddress"
                    placeholder="Mac Address"
                    value={this.state.macAddress}  
                    onChange={this.handleChange}
                    className="form-control"
            />
          </div>
          <div className="form-group">
            <select
              name="selectedTech"
              onChange={this.handleChange}
              className="form-control"
            >
               <option selected disabled>Select one</option>
              {techsOptions}
            </select>
          </div>
          { this.state.loading ? <Loader/> : <button type="submit" 
                  value="Submit" 
                  onClick={this.fetchPlaceItem}
                  className="btn btn-success"
          >Transfer</button> }
        </form>
      </div>
    )
  }

  fetchPlaceItem(event) {
    this.setState({loading: true});
    fetch('http://localhost:3000/inventory/transfer_item?item_mac=' 
      + this.state.macAddress 
      + '&location_id='+ this.state.selectedTech)
      .then(res => res.json())
      .then(data => {
        this.setState({loading: false});
        alert( data.data? data.data : "The item is already in your truck")})
      .catch(error => {
        this.setState({loading: false});
        alert("Technical debt - show error message")})
    event.preventDefault()
  }

  handleChange(event) {
   const target = event.target
   const value = target.value
   const name = target.name
   this.setState({[name]: value})
  }

}

const mapStateToProps = state => ({
  user: state.auth.user
})

export default connect(mapStateToProps, {currentUser})(TransferItem)
