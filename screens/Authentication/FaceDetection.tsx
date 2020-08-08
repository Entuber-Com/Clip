
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity, AsyncStorage } from 'react-native';
import * as FaceDetector from 'expo-face-detector';
import { Camera } from 'expo-camera';
import { authenticatedUserDetails } from '../../constants/AuthenticatedUsers';
import { useDispatch } from 'react-redux';
import * as firebase from 'firebase';
import moment from 'moment';


export default function FaceDetection(props: any) {
  const [hasPermission, setHasPermission] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const cameraRef = useRef<any>(null)
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (!hasPermission)  {
    return <Text>No access to camera</Text>;
  }
  
  const handleFacesDetected = async (event: any) =>{
      if (event.faces.length > 0) {
        await AsyncStorage.setItem('userToken', 'dummy-token')
            const userDetail = authenticatedUserDetails
            .find((user: {email: string, userName: string}) => user.email === 'david.black@gmail.com');
            const dispatchData = {
                accessToken: 'dummy-token',
                userDetails: {
                    email: userDetail?.email,
                    userName: userDetail && userDetail.userName || ''
                }
            }      
            const pushref = firebase.database()
            .ref('Notification Fanout/ClientID/5KPoVKeO14afWztF9maifPTaf3h1')
            .push();
            pushref.set({
              Headline: 'Demo Push Notification',
              Read: false,
              Subheadline: 'Subheadline test',
              Timestamp: moment().unix()
            })
            dispatch({type: 'SIGN_IN', payload: dispatchData})
      }
  }
  return (
    <View style={{ flex: 1 }}>
        <Camera style={{ flex: 1 }}
            type={type}
            ref={cameraRef}
            onFacesDetected={handleFacesDetected}
            faceDetectorSettings={{
                mode: FaceDetector.Constants.Mode.fast,
                detectLandmarks: FaceDetector.Constants.Landmarks.none,
                runClassifications: FaceDetector.Constants.Classifications.none,
                minDetectionInterval: 500,
                tracking: true,
            }}
        >
      {/*   <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: 'flex-end',
              alignItems: 'center',
            }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
          </TouchableOpacity>
        </View> */}
      </Camera>
    </View>
  );
}
