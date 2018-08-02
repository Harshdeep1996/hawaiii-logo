import './App.css';
import React, { Component } from 'react';
import MaterialIcon from 'material-icons-react';


export default class ValuesInfo extends Component {
    render () {

        const iconStyleWebFullWeb = ({
          width: (this.props.width * 33.3) / 100,
          height: (this.props.height * 50) / 100,
          backgroundColor: '#e5e4e2',
          justifyContent:'center',
          display: 'flex',
          alignItems:'center'
        });

        return (
            <div style={ iconStyleWebFullWeb }>
                <div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <MaterialIcon icon={this.props.iconLabel} color='#202020' size={'130%'}/>
                    </div>
                    <h2 style={{ color:'#202020', textAlign:'center', fontFamily: 'Philosopher', fontSize:'1.41vw' }}>{ this.props.label }</h2>
                    <p style={{ color:'#202020', width:(this.props.width * 22.4) / 100, fontFamily: 'Philosopher', textAlign:'center', fontSize:'1.1vw' }}>{this.props.paraInfo}</p>
                </div>
            </div>
        );
    }
}
