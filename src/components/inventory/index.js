import React, { Component } from 'react';
import { connect } from 'react-redux'
import { currentUser } from '../../actions/authActions'
import TechInventory from './TechInventory'
import Loader from '../loader/Loader'

class InventoryView extends Component {

  constructor(props){
    super(props)
    this.state = {
      techs: [],
      techLocationId: '',
      truckName: '',
      loading: false
    }
    this.handleSelectChange = this.handleSelectChange.bind(this)
  }

  componentWillMount() {
    this.props.currentUser()

    const locationId = this.props.match.params.locationId || this.props.user.locationId
    const truckName = this.props.match.params.truckName || 'My truck'
    this.setState({
      techLocationId: locationId,
      truckName: truckName
    })

    this.setState({loading: true});
    fetch('http://localhost:3000/local_techs/get?employee_id=' + this.props.user.id)
      .then(res => res.json())
      .then(data => {
        this.setState({loading: false});
        this.setState({techs: data.data})})
  }

  componentWillReceiveProps(nextProps) {
    const locationId = nextProps.match.params.locationId || this.props.user.locationId
    const truckName = nextProps.match.params.truckName || 'My truck'
    this.setState({
      techLocationId: locationId,
      truckName: truckName
    })
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
          <h1>Inventory</h1>
          <select 
            onChange={this.handleSelectChange}
          >
            <option selected disabled>Select other tech</option>
            <option value={this.props.user.locationId}> My truck </option>
            {techsOptions}
          </select>
          { this.state.loading ? <Loader/> : null}
          <TechInventory 
            locationId={this.state.techLocationId}
            truckName={this.state.truckName}
          />
      </div>
    )
  }

  handleSelectChange(event) {
    const target = event.target
    const value = target.value
    const index = event.nativeEvent.target.selectedIndex;
    const text = event.nativeEvent.target[index].text
    this.setState({techLocationId: value})
    this.setState({truckName: text})
  }

}

const mapStateToProps = state => ({
  user: state.auth.user
})

export default connect(mapStateToProps, {currentUser})(InventoryView)
