import React, { Component } from 'react';
import Loader from '../loader/Loader';


class TechInventory extends Component {

  constructor(props){
    super(props)
    this.fetchAPI = this.fetchAPI.bind(this)
    this.state = {
      inventory: [],
      loscationId: '',
      truckName: '',
      loading: false
    }
  }

  componentWillMount() {
    this.fetchAPI(this.props.locationId)
    this.setState({
      locationId: this.props.locationId,
      truckName: this.props.truckName
    })
  }

  componentWillReceiveProps(nextProps) {
    this.fetchAPI(nextProps.locationId)
    this.setState({
      locationId: nextProps.locationId,
      truckName: nextProps.truckName
    })
  }

  render() {

    const inventoryRows = this.state.inventory.map((item) =>
      <tr key = {item.serial}>
        <th>{item.prd_vend_code}</th>
        <th>{item.prd_description}</th>
        <th>{item.serial}</th>
        <th>{item.status}</th>
        <th>{item.ivl_description}</th>
        <th>{item.last_location}</th>
        <th>{item.bmh_start_date}</th>
      </tr>
    )

    return (
      <div>
        <h2>{this.state.truckName} - {this.state.locationId}</h2>
        <table id="inventory_table" className="table table-bordered text-left table-hover">
          <thead>
            <tr>
              <th>Vend code</th>
              <th>Description</th>
              <th>Serial</th>
              <th>Status</th>
              <th>Truck</th>
              <th>Last location</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            { inventoryRows }
          </tbody>
        </table>
        { this.state.loading ? <Loader/> : null }
      </div>
    )
  }

  fetchAPI(location){
    this.setState({loading: true});
    fetch('http://localhost:3000/inventory/get?location_id=' + location)
      .then(res => res.json())
      .then(data => {
        // this.setState({loading: false});
        this.setState({inventory: data.data}) })
  }

}


export default TechInventory
