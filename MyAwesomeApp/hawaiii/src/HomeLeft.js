import './App.css';
import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

export default class HomeLeft extends Component {
    render() {
        return(
            <div style={{ width: (this.props.width * 50)/100, height:(this.props.height * 90.5) / 100, backgroundColor: '#e5e4e2'}}>

                <div style={{ marginTop:80, marginLeft:10 }}>
                    <h1 style={{ color:'#202020', fontFamily:'Philosopher', fontSize:(this.props.width * 0.037), margin:0}}>{'Transforming the way'}</h1>
                    <h1 style={{ color:'#202020', fontFamily:'Philosopher', fontSize:(this.props.width * 0.037), margin:0, position:'relative', right:-(this.props.width/2) * 0.6}}>{'you travel..'}</h1>
                </div>

                <div style={{ display:'flex', justifyContent:'center', alignItems:'center', paddingTop:8}}>
                    <img src={"https://cdn.businesstraveller.com/wp-content/uploads/fly-images/807449/Happy-passenger-e1494847969809-916x515.jpg"} alt="" style={{ opacity:0.7, width:'100%', height:'50%' }}/>
                </div>

                <div style={{ width:'14vw', height:'12vh', display:'flex', position:'relative', top:-(this.props.height/2) * 0.08, right:-((this.props.width * 50)/100) * 0.6}}>
                    <Card style={{ display:'block', backgroundColor:'#202020'}}>
                        <CardContent>
                            <Typography style={{ fontSize:'0.91vw', color:'#e5e4e2', fontFamily:'Philosopher'}}>
                                App on Android and App Store soon.{'\n'}
                            </Typography>

                            <Typography style={{ fontSize:'0.91vw', color:'#e5e4e2', fontFamily:'Philosopher'}}>
                                Launch happening soon.
                            </Typography>
                        </CardContent>
                    </Card>
                </div>

            </div>
        );
    }
}