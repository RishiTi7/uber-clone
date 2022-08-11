import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import MapView, {Marker} from 'react-native-maps';
import tw from 'tailwind-react-native-classnames';
import { selectDestination, selectOrigin, setTravelTimeInformation } from '../slices/NavSlice';
import { useSelector } from 'react-redux';
import  MapViewDirections  from 'react-native-maps-directions';
import {GOOGLE_API_KEY} from "@env";
import {useRef} from "react";
import { useEffect } from 'react';

const Map = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const mapRef = useRef(null);
  const dispatch =useDispatch();

  useEffect(() =>{
    if(!origin || !destination) return;

    //zoom and fit to markers
    mapRef.current.fitToSuppliedMarkers(["origin","destination"],{
      edgePadding :{top:50 ,right:50, left:50,bottom:50},
    });
  }, [origin , destination]);

  useEffect(() => {
    if(!origin||!destination) return;
    
    const getTravelTime = () =>{
      fetch("https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destination=${destination.description}&key=${GOOGLE_MAPS_APIKEY}")
      .then((res) =>res.json()) // this is a response we are passing through json
      .then((data) =>{
        dispatch(setTravelTimeInformation(data.rows[0].elements[0])); // access to the data
      })
    }
    getTravelTime();
  }, [origin, destination,GOOGLE_MAPS_APIKEY])



  return (
    <MapView      
      ref={mapRef}
      style ={tw`flex-1`}
      // mapType="mutedStandard"  this simplifies the map
      initialRegion={{
      latitude: origin.location.lat,
      longitude: origin.location.lng,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    }}
  >
    {origin && destination && (
      <MapViewDirections 
        origin = {origin.description}
        destination = {destination.description}
        apikey={GOOGLE_MAPS_APIKEY}
        strokeColor="black"
        strokeWidth={3}/>
    )}



    {origin?.location &&(
      <Marker 
      coordinate={{
        latitude : origin.location.lat,
        longitude: origin.location.lng
      }}
      title = "Origin"
      description = {origin.description}
      identifier = "origin"
      />
    )}
    </MapView>
  );
};

export default Map

const styles = StyleSheet.create({})