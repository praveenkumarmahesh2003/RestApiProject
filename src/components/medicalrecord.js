import React, { Component } from 'react';
import axios from 'axios';
import Showdata from './Showdata';

class Medicalrecord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      medicalRecords: [], // Store fetched medical records as an array of objects
      medicalrecId: '',
      patientId: '',
      doctorId: '',
      dateofvisit: '',
      diagnosis: '',
      prescribedMedications: '',
      isloggedin: false,
    };
  }

  handlemedicalrecIdChange = (event) => {
    this.setState({ medicalrecId: event.target.value });
  };

  handlepatientIdChange = (event) => {
    this.setState({ patientId: event.target.value });
  };

  handledoctorIdChange = (event) => {
    this.setState({ doctorId: event.target.value });
  };

  handledateofvisitChange = (event) => {
    this.setState({ dateofvisit: event.target.value });
  };

  handlediagnosisChange = (event) => {
    this.setState({ diagnosis: event.target.value });
  };

  handleprescribedMedicationsChange = (event) => {
    this.setState({ prescribedMedications: event.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      medicalrecId: this.state.medicalrecId,
      patientId: this.state.patientId,
      doctorId: this.state.doctorId,
      dateofvisit: this.state.dateofvisit,
      diagnosis: this.state.diagnosis,
      prescribedMedications: this.state.prescribedMedications,
    };

    try {
      await axios.post('http://127.0.0.1:8080/add/rec', data);
      // Handle success or redirect to another page
    } catch (error) {
      console.error('Axios error:', error);
    }
  };

  componentDidMount() {
    // Fetch data from the backend using axios.get
    axios
      .get('http://127.0.0.1:8080/show/rec') // Replace with your API endpoint
      .then((response) => {
        // Handle the response data and update the state
        const { data } = response;
        if (data) {
          this.setState({ medicalRecords: data });
        }
      })
      .catch((error) => {
        console.error('Axios error:', error);
      });
  }

  render() {
    const { medicalRecords } = this.state;

    return (
      <div className="medical-record-box">
        <h2>Medical Records</h2>
        {/* <table>
          <thead>
            <tr>
              <th>Medical Record ID</th>
              <th>Patient ID</th>
              <th>Doctor ID</th>
              <th>Date of Visit</th>
              <th>Diagnosis</th>
              <th>Prescribed Medications</th>
            </tr>
          </thead>
          <tbody>
            {medicalRecords.map((record) => (
              <tr key={record.medicalrecId}>
                <td>{record.medicalrecId}</td>
                <td>{record.patientId}</td>
                <td>{record.doctorId}</td>
                <td>{record.dateofvisit}</td>
                <td>{record.diagnosis}</td>
                <td>{record.prescribedMedications}</td>
              </tr>
            ))}
          </tbody>
        </table> */}
        <div className='dirpage'>
          <div>
          <h2>Add Medical Record</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Medical Record ID:</label>
            <input
              type="number"
              name="medicalrecId"
              value={this.state.medicalrecId}
              onChange={this.handlemedicalrecIdChange}
            />
          </div>
          <div className="form-group">
            <label>Patient ID:</label>
            <input
              type="number"
              name="patientId"
              value={this.state.patientId}
              onChange={this.handlepatientIdChange}
            />
          </div>
          <div className="form-group">
            <label>Doctor ID:</label>
            <input
              type="number"
              name="doctorId"
              value={this.state.doctorId}
              onChange={this.handledoctorIdChange}
            />
          </div>
          <div className="form-group">
            <label>Date of Visit:</label>
            <input
              type="date"
              name="dateofvisit"
              value={this.state.dateofvisit}
              onChange={this.handledateofvisitChange}
            />
          </div>
          <div className="form-group">
            <label>Diagnosis:</label>
            <input
              type="text"
              name="diagnosis"
              value={this.state.diagnosis}
              onChange={this.handlediagnosisChange}
            />
          </div>
          <div className="form-group">
            <label>Prescribed Medications:</label>
            <input
              type="text"
              name="prescribedMedications"
              value={this.state.prescribedMedications}
              onChange={this.handleprescribedMedicationsChange}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
          </div>
          <div className='shod'>

                <Showdata dataType="medicalRecords"/>
          </div>
          
        </div>


      </div>
    );
  }
}
export default Medicalrecord;