import React, { Component } from 'react';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import DateTimePicker from 'material-ui-datetimepicker';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DatePickerDialog from 'material-ui/DatePicker/DatePickerDialog'
import TimePickerDialog from 'material-ui/TimePicker/TimePickerDialog';

import Modal from 'react-responsive-modal';


export default class BookingForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      airAmbChecked: false,
      medicalEmergencyType: '',
      numberPassengers: '',
      dateTimeBooking: null,
      value: '',
      value2: '',
      phone: ''
    };

    this.upvote = this.upvote.bind(this);
    this.setDate = this.setDate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  } 

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  handleChange = () => event => {
    this.setState({ airAmbChecked: event.target.checked });
  }

  handleChangeString = (name) => event => {
    this.setState({ [name]: event.target.value });
  }

  setDate(dateTimeBooking) {
    // Right now the value is set to null
    this.setState({ dateTimeBooking: dateTimeBooking });
  }

  upvote(e, from, to, airAmbChecked, medicalEmergencyType, dateTimeBooking, numberPassengers, phone) {
    e.preventDefault();

    var body = {
        from:from,
        to:to,
        airAmbChecked: airAmbChecked ? 'Yes it is' : 'No it is not',
        medicalEmergencyType: airAmbChecked ? medicalEmergencyType : 'Not a medical emergency case',
        dateTimeBooking: dateTimeBooking,
        numberPassengers: numberPassengers,
        phone:phone
    };

    // Call email function
    fetch("/users", {
      method: 'post',
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      } 
    })
    .then(res => {
      console.log(res.json());
    })
    .catch(res => {
        console.log(res.json());
    });

    // // Set Modal
    // this.setState({ open: true });

    // Clearing the form
   //  this.setState({
   //    airAmbChecked: false,
   //    medicalEmergencyType: '',
   //    numberPassengers: '',
   //    dateTimeBooking: null,
   //    value: '',
   //    value2: '',
   //    phone:''
   // });
    return false;
  }

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {

    // Need to add date logic
    const { value, value2, numberPassengers, phone } = this.state;
    const isEnabled =
          value.length > 0 &&
          value2.length > 0 &&
          phone.length >= 10 && phone.length <= 13 && 
          numberPassengers.length > 0 && !isNaN(numberPassengers);

    return (
      <MuiThemeProvider>
        <div style={{ padding: 15 }}>
          <h2 style={{ color:'#202020', fontFamily: 'Philosopher' }}>Do your booking with us now!</h2>

          <form ref="form" onSubmit={this.handleSubmit}>
            <div>
                <TextField
                    id="from"
                    label="From (Departure)"
                    required={ true }
                    InputLabelProps={{
                    style: {
                        color: '#202020',
                        fontFamily: 'Philosopher'
                      }
                    }}
                    value={this.state.value}
                    onChange={this.handleChangeString('value')}
                    margin="normal"
                    style={{ width: '80%' }}
                />
            </div>


              <div>
                <TextField
                  id="from"
                  value={this.state.value2}
                  required={ true }
                  label="To (Arrival)"
                  InputLabelProps={{
                    style: {
                      color: '#202020',
                      fontFamily: 'Philosopher'
                    }
                  }}
                  onChange={this.handleChangeString('value2')}
                  margin="normal"
                  style={{ width: '80%' }}
                />
              </div>

              <div>
                <TextField
                  id="numberPassengers"
                  label="Number of Passengers"
                  InputLabelProps={{
                    style: {
                      color: '#202020',
                      fontFamily: 'Philosopher',
                    }
                  }}
                  value={this.state.numberPassengers}
                  required={ true }
                  onChange={this.handleChangeString('numberPassengers')}
                  margin="normal"
                  style={{ width: '80%' }}
                />
              </div>


              <div>
                <TextField
                  id="phone"
                  value={this.state.phone}
                  required={ true }
                  label="10 digit Mobile Number"
                  InputLabelProps={{
                    style: {
                      color: '#202020',
                      fontFamily: 'Philosopher'
                    }
                  }}
                  onChange={this.handleChangeString('phone')}
                  margin="normal"
                  style={{ width: '80%' }}
                />
              </div>

              <div>
                <FormControlLabel
                 classes={{
                    label: {
                      fontFamily: 'Philosopher'
                    },
                  }}
                  control={
                    <Checkbox
                      checked={this.state.airAmbChecked}
                      onChange={this.handleChange()}
                      value="airAmbChecked"
                      style={{ color:'#00D5D5' }}
                    />
                  }
                  label="Would it be used as an air ambulance?"
              />
            </div>

            {this.state.airAmbChecked && (
              <div>
                <div>
                  <TextField
                    id="medicalEmergency"
                    label="Type of medical emergency"
                    InputLabelProps={{
                    style: {
                        color: '#202020',
                        fontFamily: 'Philosopher'
                      }
                    }}
                    value={this.state.medicalEmergencyType}
                    onChange={this.handleChangeString('medicalEmergencyType')}
                    margin="normal"
                    style={{ width: '80%' }}
                  />
                </div>
              </div>
            )}

            <div>
              <DateTimePicker 
                DatePicker={DatePickerDialog}
                TimePicker={TimePickerDialog}
                name="timeDateBooking"
                id="timeDateBooking"
                textFieldClassName="datetime-input"
                floatingLabelText="Date and time of booking *"
                onChange={this.setDate}
                value={this.state.dateTimeBooking}
                style={{ width: '80%', fontFamily: 'Philosopher' }}
              />
            </div>

            <Button style={{ fontFamily: 'Philosopher', backgroundColor:!isEnabled ? '#202020' : '#00d4d5', color:!isEnabled ? '#e5e4e2': '#202020', opacity: !isEnabled ? 0.4 : 0.9}} variant="contained" type="submit" onClick={(e) => this.upvote(e, this.state.value, this.state.value2, this.state.airAmbChecked, this.state.medicalEmergencyType, this.state.dateTimeBooking, this.state.numberPassengers, this.state.phone)} disabled={!isEnabled}>
              Book Now
            </Button>

            <Modal open={this.state.open} onClose={this.onCloseModal} center>
              <h2 style={{ fontFamily:'Philosopher', color:'#e5e4e2', marginTop:30 }}>Your query has been received! We will get back to you asap.</h2>
            </Modal>
          </form>

        </div>

      </MuiThemeProvider>
    );
  }
}
