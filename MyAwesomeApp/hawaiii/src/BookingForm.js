import React, { Component } from 'react';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import DateTimePicker from 'material-ui-datetimepicker';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DatePickerDialog from 'material-ui/DatePicker/DatePickerDialog'
import TimePickerDialog from 'material-ui/TimePicker/TimePickerDialog';

import ReactGoogleMapLoader from "react-google-maps-loader";
import ReactGooglePlacesSuggest from "react-google-places-suggest";

import Modal from 'react-responsive-modal';


const API_KEY = "AIzaSyAGHQUFdUuZDgZ5pdszYqzFa3SWu4rA9v4";

export default class BookingForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      airAmbChecked: false,
      medicalEmergencyType: '',
      numberPassengers: '',
      dateTimeBooking: null,
      search: '',
      value: '',
      search2: '',
      value2: ''
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

  handleInputChangeFrom(e) {
    this.setState({search: e.target.value, value: e.target.value});
  }

  handleSelectSuggestFrom(suggest) {
    console.log(suggest);
    this.setState({search: "", value: suggest.formatted_address});
  }

  handleInputChangeTo(e) {
    this.setState({search2: e.target.value, value2: e.target.value});
  }

  handleSelectSuggestTo(suggest) {
    console.log(suggest);
    this.setState({search2: "", value2: suggest.formatted_address});
  }

  upvote(e, from, to, airAmbChecked, medicalEmergencyType, dateTimeBooking, numberPassengers) {
    e.preventDefault();

    var body = {
        from:from,
        to:to,
        airAmbChecked: airAmbChecked ? 'Not an air emergency case' : airAmbChecked,
        medicalEmergencyType: airAmbChecked ? medicalEmergencyType : 'Not a medical emergency case',
        dateTimeBooking: dateTimeBooking,
        numberPassengers: numberPassengers
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

    // Set Modal
    this.setState({ open: true });

    // Clearing the form
    this.setState({
      airAmbChecked: false,
      medicalEmergencyType: '',
      numberPassengers: '',
      dateTimeBooking: null,
      search: '',
      value: '',
      search2: '',
      value2: ''
   });
    return false;
  }

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {

    // Need to add date logic
    const { value, value2, numberPassengers } = this.state;
    const isEnabled =
          value.length > 0 &&
          value2.length > 0 &&
          numberPassengers.length > 0 && !isNaN(numberPassengers);

    return (
      <MuiThemeProvider>
        <div style={{ padding: 15 }}>
          <h2 style={{ color:'#202020', fontFamily: 'Philosopher' }}>Do your booking with us now!</h2>

          <form ref="form" onSubmit={this.handleSubmit}>
            <div>

              <ReactGoogleMapLoader
                params={{
                  key: API_KEY,
                  libraries: "places",
                }}
                render={googleMaps =>
                  googleMaps && (
                    <div>
                      <ReactGooglePlacesSuggest
                        autocompletionRequest={{input: this.state.search}}
                        googleMaps={googleMaps}
                        onSelectSuggest={this.handleSelectSuggestFrom.bind(this)}
                      >

                        <TextField
                          id="from"
                          value={this.state.value}
                          required={ true }
                          label="From (Departure)"
                          InputLabelProps={{
                            style: {
                              color: '#202020',
                              fontFamily: 'Philosopher'
                            }
                          }}
                          onChange={this.handleInputChangeFrom.bind(this)}
                          margin="normal"
                          style={{ width: '80%' }}
                        />

                      </ReactGooglePlacesSuggest>
                    </div>
                  )
                }
              />
              </div>

              <div>

              <ReactGoogleMapLoader
                params={{
                  key: API_KEY,
                  libraries: "places",
                }}
                render={googleMaps =>
                  googleMaps && (
                    <div>
                      <ReactGooglePlacesSuggest
                        autocompletionRequest={{input: this.state.search2}}
                        googleMaps={googleMaps}
                        onSelectSuggest={this.handleSelectSuggestTo.bind(this)}
                      >

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
                          onChange={this.handleInputChangeTo.bind(this)}
                          margin="normal"
                          style={{ width: '80%' }}
                        />

                      </ReactGooglePlacesSuggest>
                    </div>
                  )
                }
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
                      cssUnderline: {
    					'&:after': {
      						borderBottomColor: '#00d4d5',
    					},
  						},
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

            <Button style={{ fontFamily: 'Philosopher', backgroundColor:'#00D5D5', color:'#202020' }}variant="contained" color="primary" type="submit" onClick={(e) => this.upvote(e, this.state.value, this.state.value2, this.state.airAmbChecked, this.state.medicalEmergencyType, this.state.dateTimeBooking, this.state.numberPassengers)} disabled={!isEnabled}>
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
