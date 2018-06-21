import React, { Component } from 'react';
import { connect } from 'react-redux'
import { currentUser } from '../../actions/authActions'
import { Link } from 'react-router-dom';



class TechsView extends Component {

  constructor(props){
    super(props)
    this.state = {
      techs: []
    }
  }

  componentWillMount() {
    this.props.currentUser()
    fetch('http://localhost:3000/local_techs/get?employee_id=' + this.props.user.id)
      .then(res => res.json())
      .then(data => this.setState({techs: data.data}))
  }

  render() {
    const techsRows = this.state.techs.map((tech) =>
      <tr key={tech.display_name + tech.display_name}>
        <th>{tech.display_name}</th>
        <th>{tech.location_pk}</th>
        <th>
          <Link to=
            {
              '/inventory/' + tech.location_pk + '/' + tech.display_name
            }
          >
            Inventory
          </Link>
        </th>
      </tr>
    )

    return (
      <div>
          <h1>Local Techs</h1>
          <table id="techs_table" className="table table-bordered text-left table-hover">
            <thead>
              <tr>
                <th>Tech/Truck</th>
                <th>Location id</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              { techsRows }
            </tbody>
          </table>
        </div>
      )
  }

}

const mapStateToProps = state => ({
  user: state.auth.user
})

export default connect(mapStateToProps, {currentUser})(TechsView)
