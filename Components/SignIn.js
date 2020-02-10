import React from 'react'
import { 
	View, 
	TextInput, 
	Button, 
    AsyncStorage,
    Alert,
    Text,
	ActivityIndicator } from 'react-native'

class SignIn extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading : false,
            errorMessage: '',
            email: '',
            password: ''
        }
    }

    render() {
        return(
            <View style={styles.main_container}>
                <TextInput 
                    style={styles.textinput} 
                    placeholder="Login"
                    onChangeText={(e) => this._setEmail(e)}
                />
                <TextInput 
                    secureTextEntry={true} 
                    style={styles.textinput} 
                    placeholder="Password"
                    onChangeText={(e) => this._setPassword(e)}
                />
                <View style={styles.error}>
                    {this._displayError()}
                </View>
                <View style={styles.buttons}>
                    <View style={styles.button}>
                        <Button
                            buttonStyle={{ margin: 20 }}
                            color="#8db8d6"
                            backgroundColor="#03A9F4"
                            textStyle={{ color: "#bcbec1" }}
                            title=" Sign Up "
                            onPress={this._goToSignUp}
                            //onPress={() => Alert.alert('Coucou toi :)')}
                        />
                    </View>
                    <View style={styles.button}>
                        <Button
                            buttonStyle={{ margin: 20 }}
                            backgroundColor="#03A9F4"
                            textStyle={{ color: "#bcbec1" }}
                            title="Sign In !"
                            disabled={this._buttonIsDisabled()}
                            onPress={this._signInAsync}
                        />
                    </View>
                </View>
                {this._displayLoading()}
              </View>
        )
    }
    
    _displayLoading() {
        if (this.state.isLoading) {
          return (
            <View style={styles.loading_container}>
              <ActivityIndicator size='large' />
            </View>
          )
        }
      }
  
    _displayError(){
        //console.log('Update error message.')
        var message = ''

        if (this.state.errorMessage=='emailIsEmpty') {
            message = 'Email cannot be blank.'
        }
        if (this.state.errorMessage=='pwdIsEmpty') {
            message = 'Password cannot be blank.'
        }

        return(
            <Text style= {{color: '#9e1818'}}>{message}</Text>
        )
    }
    
    _buttonIsDisabled() {
        let res = false;
        if (this.state.errorMessage !== '') {
            res = true
        }
        return res
    }

    _setEmail(e) {
        if (e) {
            e = String(e).toLowerCase() 
            this.setState({
                email: e,
                errorMessage: ''
            })
        } else {
            this.setState({errorMessage: 'emailIsEmpty'})
        }
    }

    _setPassword(e) {
        if (e) {
            this.setState({
                password: e,
                errorMessage: ''
            })
        } else {
            this.setState({errorMessage: 'pwdIsEmpty'})            
        }
    }
    
	_goToSignUp = () => {
        this.props.navigation.navigate('SignUp')
    }
    _signInAsync = async () => {
        if (this.state.email == '' ){
            this.setState({errorMessage: 'emailIsEmpty'})
        } else if (this.state.password == '') {
            this.setState({errorMessage: 'pwdIsEmpty'})
        } else if (this.state.errorMessage !== '') {
            console.log('Cannot sign up !')
        } else {
            await AsyncStorage.setItem('userToken', 'abc');
            this.props.navigation.navigate('App');
        }
    };
}

const styles = {
    main_container:{
		flex: 1,
		margin: 20
    },
    textinput: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 50,
        marginBottom: 10,
        height: 50,
        borderColor: '#000000',
        borderWidth: 0.7,
        paddingLeft: 12
    },
    error: {
        flex: 0.3,
        marginTop: 50,
        alignItems: 'center'
    },
    buttons: {
        flex:0.6,
        flexDirection: 'column-reverse',
        marginTop: 20
    },
    button:{
        marginTop: 50
    },
    loading_container:{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
  }

export default SignIn