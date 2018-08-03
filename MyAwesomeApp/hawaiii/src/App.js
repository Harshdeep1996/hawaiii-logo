import './App.css';
import React, { Component } from 'react';
import GoogleMap from './ContactMap';
import ContactInfo from './ContactInfo';
import ValuesInfo from './ValuesInfo';
import FlexView from 'react-flexview';
import BookingForm from './BookingForm';
import HomeLeft from './HomeLeft';


export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = { 
        width: 0,
        height: 0
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.getMobileView = this.getMobileView.bind(this);
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

  getMobileView() {
    return(
      <FlexView column hAlignContent='left' vAlignContent='center'>

        <div style={{ width: this.state.width, height: (this.state.height * 9.6) / 100, backgroundColor: '#202020', justifyContent:'center', alignItems:'center', display:'flex'}}>
            <img src='https://github.com/Harshdeep1996/hawaiii-logo/blob/master/hawaiii-logo_1.png?raw=true' alt='' style={{ width:'17%', height:'82%'}}/>
        </div>

        <FlexView row hAlignContent='left' vAlignContent='center'>

          <div style={{ width: (this.state.width * 100)/100, height:(this.state.height * 90.5) / 100, backgroundColor: '#e5e4e2', justifyContent:'center', display: 'flex', alignItems:'center'}}>
            <BookingForm />
          </div>

        </FlexView>
      </FlexView>
    );
  }

  getWebView() {
    return (
      <FlexView column hAlignContent='left' vAlignContent='center'>

        <div style={{ width: this.state.width, height: (this.state.height * 9.5) / 100, backgroundColor: '#202020', justifyContent:'center', alignItems:'center', display:'flex'}}>
            <img src='https://github.com/Harshdeep1996/hawaiii-logo/blob/master/hawaiii-logo_1.png?raw=true' alt='' style={{ maxWidth:'40%', maxHeight:'90%' }}/>
        </div>

        <FlexView row hAlignContent='left' vAlignContent='center'>
          <HomeLeft width={this.state.width} height={this.state.height} />
          <div style={{ width: (this.state.width * 50)/100, height:(this.state.height * 90.5) / 100, backgroundColor: '#e5e4e2', justifyContent:'center', display: 'flex', alignItems:'center'}}>
            <BookingForm />
          </div>

        </FlexView>
        
        <FlexView row hAlignContent='left' vAlignContent='center'>
          <ValuesInfo 
            width={this.state.width}
            height={this.state.height}
            label={"Save Money"}
            iconLabel={"attach_money"}
            paraInfo={"Enjoy affordable flying with Hawaiii. Book luxury private jet/helicopter at lowest available cost now. Reimagining and building the flying network for everyone."}
          />
          <ValuesInfo
            width={this.state.width}
            height={this.state.height}
            label={"Quick way to book your jet"}
            iconLabel={"access_time"}
            paraInfo={"Ditch the line. Skip the long waiting time and hassle of coordinating. Let us work for you. Book online using the website/app. We are always just a call away."}
          />
          <ValuesInfo
            width={this.state.width}
            height={this.state.height}
            label={"Saving lives everywhere, anytime"}
            iconLabel={"local_hospital"}
            paraInfo={"Want an air ambulance in your city or village? Count on us for the service provider with our largest fleet service."}
          />
        </FlexView>

        <FlexView row hAlignContent='left' vAlignContent='center'>
          <div style={{ width: (this.state.width * 50)/100, height:(this.state.height * 60) / 100, backgroundColor: '#202020' }}>
            <ContactInfo width={(this.state.width * 47) / 100} height={(this.state.height * 50)/100} />
          </div>
          <div style={{ width: (this.state.width * 53)/100, height:(this.state.height * 60) / 100, backgroundColor: '#202020' }}>
            <GoogleMap />
          </div>
        </FlexView>

      </FlexView>
    );
  }

  render() {
    const isMobile = this.state.width <= 700;
    if(!isMobile) {
      return(
        this.getWebView()
      );
    }
    else {
      return(this.getMobileView());
    }

  }
}