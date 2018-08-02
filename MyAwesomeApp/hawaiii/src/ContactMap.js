import React, { Component } from 'react';
import ReactGoogleMapLoader from "react-google-maps-loader";
import ReactGoogleMap from "react-google-map";


const GOOGLE_MAP_KEY = "AIzaSyAGHQUFdUuZDgZ5pdszYqzFa3SWu4rA9v4";


export default class GoogleMap extends Component {

    createMapOptions = maps => {
        return {
            fullscreenControl: false
        }
    }

    render() {
        return (
          <ReactGoogleMapLoader
            params={{
                key: GOOGLE_MAP_KEY,
                libraries: "places"
            }}
            render={googleMaps =>
                googleMaps && (
                  <div style={{height: "43vh", width: "49vw", marginTop:30, marginRight:20}}>
                    <ReactGoogleMap
                      googleMaps={googleMaps}

                      coordinates={[
                        {
                          title: "Hawaiii Office",
                          position: {
                            lat: 28.5497,
                            lng: 77.2535,
                          },
                        }
                      ]}
                      center={{lat: 28.5497, lng: 77.2535}}
                      zoom={15}
                    />

                  </div>
                )}
              />
        );
    }
}