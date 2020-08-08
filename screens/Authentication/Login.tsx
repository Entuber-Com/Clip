import React, { useState, useEffect } from 'react'
import { Container, Content, Form, Item, Input,  Button, Toast, Icon,Text,  Card, CardItem, Row, Thumbnail, Spinner } from 'native-base';
import { emptyFieldValidator, emailValidator, hasError } from '../../services/AuthService';
import { useDispatch } from 'react-redux';
import * as authenticatedUsers from '../../constants/LoginForm.data';
import {StyleSheet, TouchableOpacity, AsyncStorage} from 'react-native';
import { authenticatedUserDetails } from '../../constants/AuthenticatedUsers';
import {Asset} from 'expo-asset';
import * as firebase from 'firebase';
import moment from 'moment';


export const Login = (props: any) => {
    /**
     * Variable declaration
     */
    const [logo, setLogo] = useState<string>('');
    const [email, setEmail] = useState({ value: '', error: '', hasError: true, touched: false });
    const [password, setPassword] = useState({ value: '', error: '', hasError: true, touched: false });
    const [loading, setLoading] = useState<boolean>(false);
    const [eyePassword, setEyePassword] = useState<boolean>(false);
    const [errorText, setErrorText] = useState('')
    const dispatch = useDispatch();

     /**
     * component did mount lifecycle
     */
    useEffect(() => {
        initialiseLogo();
    }, [])

    useEffect(() => {
        let timer: any = null;
        if (errorText) {
            timer = setTimeout(() => setErrorText(''), 3000);
        }
        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        }
    }, [errorText])

    /**
     * Initialises the logo
     */
    const initialiseLogo = async () => {
        const imagePath = Asset.fromModule(require('../../assets/images/logo.png')).uri;
        setLogo(imagePath);
    }
  
    /**
     * When login button is pressed
     */
    const onLoginPressed = async () => {
      setLoading(true);
      const emailError = emailValidator(email.value);
      const passwordError = emptyFieldValidator(password.value);
      
    
      if (emailError || passwordError) {
        setEmail({ ...email, error: emailError, hasError: hasError('login.email', email.value) });
        setPassword({ ...password, error: passwordError, hasError: hasError('login.password', password.value) });
        return;
      }

      const payload = {
        email: email.value.toLowerCase(),
        password: password.value
      }

      if (
          authenticatedUsers.users.filter((user: {email: string, password: string}) => JSON.stringify(user) === JSON.stringify(payload)).length > 0
        ) {
            await AsyncStorage.setItem('userToken', 'dummy-token')
            const userDetail = authenticatedUserDetails
            .find((user: {email: string, userName: string}) => user.email === payload.email);
            const dispatchData = {
                accessToken: 'dummy-token',
                userDetails: {
                    email: email.value,
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
            setLoading(false);      
            dispatch({type: 'SIGN_IN', payload: dispatchData})
        } else {
            setLoading(false);
            setErrorText('Wrong Crendentials. Please Try Again!')
        }
    };

     /**
     * Render Function
     */
    return (
        <Container style={{backgroundColor: '#f1f1f1'}}>
            <Content padder={true} contentContainerStyle={{flex: 1, justifyContent: 'center'}}>
                    <Card> 
                        <CardItem>
                            <Row style={{alignItems:'center', justifyContent: 'center'}}>
                                 <Thumbnail square
                                    large
                                    source={require('../../assets/images/logo.png')}
                                />
                            </Row>
                        </CardItem>
                        <CardItem>
                            <Form style={styles.center}>
                                <Item 
                                    success={email.value.length > 0 && !email.hasError}
                                    error={email.touched && email.hasError}
                                >
                                    <Icon   android='md-mail' ios='ios-mail' />
                                    <Input 
                                        label="Email"
                                        placeholder="Email (eg. abc@xyz.com)"
                                        returnKeyType="next"
                                        value={email.value}
                                        keyboardType='email-address'
                                        textContentType='emailAddress'
                                        onChangeText={text => setEmail({ value: text, error: emailValidator(text), hasError: hasError('login.email',text), touched: true })}
                                    />
                                </Item>

                            <Item underline={false}>
                                <Text note={true} style={styles.errorText}>{email.error}</Text>
                            </Item>
                            
                                <Item success={password.value.length > 0 && !password.hasError}
                                    error={password.touched && password.hasError}
                                >

                                    {!eyePassword && <Icon  onPress={() => setEyePassword(true)} android='md-eye' ios='ios-eye'></Icon>}
                                    {eyePassword && <Icon  onPress={() => setEyePassword(false)}  android='md-eye-off' ios='ios-eye-off'></Icon>}
                                    
                                        <Input
                                            placeholder="Password (eg. Hello@123)"
                                            label="Password"
                                            returnKeyType="done"
                                            value={password.value}
                                            onChangeText={(text: string) => setPassword({ value: text, error: emptyFieldValidator(text), hasError: hasError('login.password',text), touched: true })}
                                            secureTextEntry={!eyePassword}
                                        /> 
                                
                                </Item>
                                <Item underline={false}>
                                    <Text note={true} style={styles.errorText}>{password.error}</Text>
                                </Item>
                            </Form>
                        </CardItem>
                    
                        {errorText !== '' && <CardItem style={{backgroundColor: 'red', margin: 10, borderRadius: 5}}>
                            <Text style={{color: '#fff'}}>{errorText}</Text>
                        </CardItem>}
                        
                        <CardItem style={{justifyContent: 'center'}}>
                            <Button 
                                // style={styles.alignButton}
                                dark={true}
                                iconLeft={true}
                                disabled={loading || email.hasError || password.hasError}
                                onPress={onLoginPressed}
                            >
                                <Icon  android='md-log-in' ios='ios-log-in'></Icon>
                                <Text>Login</Text>
                            </Button>    
                        </CardItem>
                        <CardItem style={{justifyContent: 'center'}}>
                            <Button 
                                // style={styles.alignButton}
                                dark={true}
                                iconLeft={true}
                                // disabled={loading || email.hasError || password.hasError}
                                onPress={() => props.navigation.navigate('FaceDetection')}
                            >
                                <Icon  android='md-log-in' ios='ios-log-in'></Icon>
                                <Text>Login with Face ID</Text>
                            </Button>    
                        </CardItem>
                        <CardItem last style={{justifyContent:'center'}}>
                                <TouchableOpacity>
                                    <Text note={true}
                                        // style={styles.alignButton}
                                        onPress={() => props.navigation.navigate('ForgotPassword')}
                                    > Forgot Password ?</Text>  
                                </TouchableOpacity>
                        </CardItem>
                    </Card>
            </Content>
      </Container>
    )
}

const styles = StyleSheet.create({
        errorText: {
            color: 'red'
        },
        center: {
           flex: 1,
           alignItems: 'center',
        },
        alignButton: {
            marginTop: 20
        }
})