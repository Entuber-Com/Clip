import React from 'react';
import PropTypes from 'prop-types';
import { Platform, Dimensions, View } from "react-native";
import { StyleSheet } from 'react-native';
interface IProps {
    children?: any,
    elevation?: any,
    opacity?: any,
    cornerRadius?: any, 
    backgroundColor?: any,
    style?: any
}

export const Card = (props: IProps) => {
    const { children, elevation, opacity, cornerRadius } = props;
  
    const cardStyle = () => {
        switch(Platform.OS) {
            case 'ios': return  {
                    shadowRadius:elevation || 0, 
                    shadowOpacity:opacity || 0, 
                    shadowOffset:{ width: 0, height: elevation || 0 },
                    borderRadius:cornerRadius || 0,
                    backgroundColor: props.backgroundColor || 'white',
                    width: Dimensions.get('window')!.width - 40 || 0,
                };
            case 'android': return {
                    elevation:elevation || 0,
                    borderRadius:cornerRadius || 0, 
                    backgroundColor: props.backgroundColor || 'white',
                    width: Dimensions.get('window')!.width - 40 || 0,
                }
        } 
    }   
  
    return(
      <View style={[cardStyle(), props.style]}>
        {children}
      </View>
    )
  
  }
  
  Card.prototype = {
    backgroundColor: PropTypes.string,
    elevation: PropTypes.number,
    cornerRadius: PropTypes.number,
    opacity: PropTypes.number
  }
  
  Card.defaultProps = {
    backgroundColor: '#ffffff',
    elevation: 3,
    cornerRadius: 5,
    opacity: .5
  }