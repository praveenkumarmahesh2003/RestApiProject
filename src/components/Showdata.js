import axios from "axios";
import React, { Component } from "react";

class Showdata extends Component {
  state = {
    data: [],
  };

  componentDidMount() {
    const { dataType } = this.props;
    let apiUrl = '';

    // Determine the API URL based on the dataType prop
    if (dataType === 'medicalRecords') {
      apiUrl = 'http://127.0.0.1:8080/show/rec';
    } else if (dataType === 'appointments') {
      apiUrl = 'http://127.0.0.1:8080/show/appointments';
    }

    // Fetch data from the API
    axios
      .get(apiUrl)
      .then((response) => {
        this.setState({ data: response.data });
        console.log(this.state.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const { dataType } = this.props;
    const { data } = this.state;

    // Define table headers and keys based on the dataType
    let tableHeaders = [];
    let dataKeys = [];

    if (dataType === 'medicalRecords') {
      tableHeaders = ['Medical Record ID', 'Patient ID', 'Doctor ID', 'Date of Visit', 'Diagnosis', 'Prescribed Medications'];
      dataKeys = ['medicalrecId', 'patientId', 'doctorId', 'dateofvisit', 'diagnosis', 'prescribedMedications'];
    } else if (dataType === 'appointments') {
      tableHeaders = ['Appointment ID', 'Patient ID', 'Doctor ID', 'Appointment Date', 'Purpose of Appointment', 'Status'];
      dataKeys = ['appointment_ID', 'patient_ID', 'doctor_ID', 'appointment_Date', 'purposeOfAppointment', 'status'];
    }

    return (
      <div className="se">
        <h2>{dataType === 'medicalRecords' ? 'Medical Records' : 'Appointments'}</h2>
        <table border={1}>
          <thead>
            <tr>
              {tableHeaders.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                {dataKeys.map((key, idx) => (
                  <td key={idx}>{item[key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Showdata;
