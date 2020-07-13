import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet, ImageBackground, TouchableOpacity,Alert,Keyboard} from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {FontAwesome} from '@expo/vector-icons'
import * as Google from 'expo-google-app-auth';
import firebase from 'firebase'

const logo = require('../assets/cinema.jpg')

export default class Login extends Component {

    isUserEqual = (googleUser, firebaseUser) => {
        if (firebaseUser) {
          var providerData = firebaseUser.providerData;
          for (var i = 0; i < providerData.length; i++) {
            if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
                providerData[i].uid === googleUser.getBasicProfile().getId()) {
              // We don't need to reauth the Firebase connection.
              return true;
            }
          }
        }
        return false;
      }

    onSignIn = googleUser => {
        console.log('Google Auth Response', googleUser);
        // We need to register an Observer on Firebase Auth to make sure auth is initialized.
        var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
          unsubscribe();
          // Check if we are already signed-in Firebase with the correct user.
          if (!this.isUserEqual(googleUser, firebaseUser)) {
            // Build Firebase credential with the Google ID token.
            var credential = firebase.auth.GoogleAuthProvider.credential(
                googleUser.idToken,
                googleUser.accessToken
            );
            // Sign in with credential from the Google user.
            firebase.auth().signInWithCredential(credential)
            .then(function(){
                console.log('user signed in');
            })
            .catch(function(error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              // ...
            });
          } else {
            console.log('User already signed-in Firebase.');
          }
        }.bind(this));
    }

    signInWithGoogleAsync = async() => {
        try {
          const result = await Google.logInAsync({
            androidClientId: '673374763205-h4pvrpu703n9b1oa5ah9cc61kt5md564.apps.googleusercontent.com',
            scopes: ['profile', 'email'],
          });
      
          if (result.type === 'success') {
              //state after
              this.onSignIn(result);
              this.props.navigation.navigate('BottomTabs')
            return result.accessToken;
          } else {
            return { cancelled: true };
          }
        } catch (e) {
          return { error: true };
        }
    } 

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.logoView}>
                    <ImageBackground source={logo} style={styles.imageLogo}></ImageBackground>
                </View>
                <View style={styles.formView}>
                    <View style={styles.groupControlButton}>
                        <View style={styles.groupControl}>
                            <TouchableOpacity style={styles.btnControlGoogle} onPress={() => this.signInWithGoogleAsync()}>
                                <Text style={styles.btnTextControl}><FontAwesome name="google" style={styles.iconLogo}/>    Login with google</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30
    },
    imageLogo: {
        width: wp('90%'),
        height: wp('70%'),
        alignSelf: 'center',
    },
    logoView: {
        flex: 6,
        flexDirection: 'column-reverse',
        marginBottom: 40,
    },
    formView: {
        flex: 5
    },
    groupControl: {
        width: wp('90%'),
        alignSelf : 'center',
        marginBottom: 30
    },
    textControl: {
        color: '#766a6a',
        fontSize: 14,
        fontWeight: '500',
        letterSpacing: 0.18,
        textTransform: 'uppercase',
        marginBottom: 8
    }, 
    inputControl: {
        marginBottom: 8,
        height: wp('8%'),
        color: 'white',
        paddingHorizontal : 5,
    },
    underlineView: {
        width: wp('90%'),
        height: 1,
        alignSelf: 'center',
        backgroundColor: '#766a6a',
    },
    btnControl: {
        borderRadius: 20,
        backgroundColor: '#ff5656',
        height: wp('12%'),
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },
    btnTextControl: {
        color: 'white',
        fontSize: 14,
        fontWeight: '700',
        lineHeight: 20,
    },
    btnControlGoogle: {
        borderRadius: 20,
        backgroundColor: '#4385F5',
        height: wp('12%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconLogo: {
        marginHorizontal: 10
    },
    groupControlButton: {
        width: wp('90%'),
        alignSelf : 'center',
        marginBottom: 10
    },
    textQuestion: {
        color: '#a9a1a1',
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 20,
    },
    signupText: {
        color: '#ff5656',
        fontSize: 12,
        fontWeight: '700',
        lineHeight: 20,
        marginHorizontal: 10
    },
    signUpView: {
        flex: 1
    },
    groupControlErr: {
        width: wp('90%'),
        alignSelf : 'center',
        marginBottom: 30,
        flexDirection: 'row'
    }
  });
  

