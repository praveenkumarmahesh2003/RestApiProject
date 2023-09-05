import React, { Component } from 'react';
import axios from 'axios';
import Showdata from './Showdata';

class Appointmentrec extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointments: [], // Store fetched appointments as an array of objects
      appointment_ID: '',
      patient_ID: '',
      doctor_ID: '',
      appointment_Date: '',
      purposeOfAppointment: '',
      status:'',
      isloggedin: false,
    };
  }

  handleAppointmentIDChange = (event) => {
    this.setState({ appointment_ID: event.target.value });
  };

  handlePatientIDChange = (event) => {
    this.setState({ patient_ID: event.target.value });
  };

  handleDoctorIDChange = (event) => {
    this.setState({ doctor_ID: event.target.value });
  };

  handleAppointmentDateChange = (event) => {
    this.setState({ appointment_Date: event.target.value });
  };

  handlePurposeOfAppointmentChange = (event) => {
    this.setState({ purposeOfAppointment: event.target.value });
  };
  handlestatusChange = (event) => {
    this.setState({ status: event.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      appointment_ID: this.state.appointment_ID,
      patient_ID: this.state.patient_ID,
      doctor_ID: this.state.doctor_ID,
      appointment_Date: this.state.appointment_Date,
      purposeOfAppointment: this.state.purposeOfAppointment,
      status: this.state.status,
    };

    try {
      await axios.post('http://127.0.0.1:8080/postdetails/rec', data);
      // Handle success or redirect to another page
    } catch (error) {
      console.error('Axios error:', error);
    }
  };

  componentDidMount() {
    // Fetch data from the backend using axios.get
    axios
      .get('http://127.0.0.1:8080/showdetails/rec') // Replace with your API endpoint
      .then((response) => {
        // Handle the response data and update the state
        const { data } = response;
        if (data) {
          this.setState({ appointments: data });
        }
      })
      .catch((error) => {
        console.error('Axios error:', error);
      });
  }

  render() {
    const { appointments } = this.state;

    return (
      <div className="medical-record-box">
        <h2>Appointments</h2>
        <h2>Add Appointment</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Appointment ID:</label>
            <input
              type="number"
              name="appointment_ID"
              value={this.state.appointment_ID}
              onChange={this.handleAppointmentIDChange}
            />
          </div>
          <div className="form-group">
            <label>Patient ID:</label>
            <input
              type="number"
              name="patient_ID"
              value={this.state.patient_ID}
              onChange={this.handlePatientIDChange}
            />
          </div>
          <div className="form-group">
            <label>Doctor ID:</label>
            <input
              type="number"
              name="doctor_ID"
              value={this.state.doctor_ID}
              onChange={this.handleDoctorIDChange}
            />
          </div>
          <div className="form-group">
            <label>Appointment Date:</label>
            <input
              type="date"
              name="appointment_Date"
              value={this.state.appointment_Date}
              onChange={this.handleAppointmentDateChange}
            />
          </div>
          <div className="form-group">
            <label>Purpose of Appointment:</label>
            <input
              type="text"
              name="purposeOfAppointment"
              value={this.state.purposeOfAppointment}
              onChange={this.handlePurposeOfAppointmentChange}
            />
          </div>
          <div className="form-group">
            <label>Status:</label>
            <input
              type="text"
              name="status"
              value={this.state.status}
              onChange={this.handlestatusChange}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
        <Showdata dataType="appointments" data={appointments} />
      </div>
    );
  }
}

export default Appointmentrec;
