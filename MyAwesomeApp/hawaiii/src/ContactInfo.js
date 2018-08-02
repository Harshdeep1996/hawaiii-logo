import './App.css';
import React, { Component } from 'react';
import { SocialIcon } from 'react-social-icons';


export default class ContactInfo extends Component {

    render() {

        const iconStyleWebFullWeb = ({
          width: '5.5vw',
          height: '5.5vh',
        });

        const textStyleWeb = {
          fontSize: '1.75vw',
          textAlign: 'left',
          color: '#e5e4e2',
          marginLeft: 20,
          marginTop: 30,
          fontFamily: 'Philosopher'
        };

        const paraStyleWeb = {
          fontSize: '1.3vw',
          textAlign:'center',
          color:'#e5e4e2',
          fontFamily: 'Philosopher'
        }

        const iconDivWeb = {
          display: 'flex',
          justifyContent: 'center'
        }

        return (
          <div>
            <h2 style={textStyleWeb}>Contact us at:</h2>
            <p style={paraStyleWeb}>+91 8826533221 (Hawaiii Main Office)</p>
            <p style={paraStyleWeb}>+91 9988000640 (Rubal - Co Founder)</p>
            <h2 style={textStyleWeb}>Address:</h2>
            <p style={paraStyleWeb}>67-68, Chandra Bhavan Building, 3rd Floor</p>
            <p style={paraStyleWeb}>Nehru Place, New Delhi, Delhi - 110019</p>
            <h2 style={textStyleWeb}>Connect with us at:</h2>
            <div style={iconDivWeb}>
              <SocialIcon url="https://www.facebook.com/Hawaiii-180284452659901/" color="#00D4D3" style={iconStyleWebFullWeb}/>
              <SocialIcon url="https://www.linkedin.com/in/rubal/" color="#00D4D3" style={iconStyleWebFullWeb}/>
              <SocialIcon url="https://twitter.com/FlyHawaiii" color="#00D4D3" style={iconStyleWebFullWeb}/>
              <SocialIcon url="https://www.instagram.com/flyhawaiii/" color="#00D4D3" style={iconStyleWebFullWeb}/>
            </div>
          </div>
        );
    }
}
